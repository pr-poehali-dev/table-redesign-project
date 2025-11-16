import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Material = {
  id: number;
  name: string;
  description: string;
  currentStock: number;
  minStock: number;
  status: 'normal' | 'low' | 'critical';
};

type Operation = {
  id: number;
  materialId: number;
  type: 'incoming' | 'outgoing';
  quantity: number;
  timestamp: string;
};

type Order = {
  id: number;
  materialId: number;
  quantity: number;
  orderDate: string;
  status: 'completed' | 'pending';
};

const Index = () => {
  const [materials, setMaterials] = useState<Material[]>([
    { id: 1, name: 'Винт M4x10', description: 'Стальной винт с потайной головкой', currentStock: 160, minStock: 50, status: 'normal' },
    { id: 2, name: 'Гайка M4', description: 'Шестигранная гайка', currentStock: 160, minStock: 80, status: 'normal' },
    { id: 3, name: 'Шайба 4мм', description: 'Пружинная шайба', currentStock: 50, minStock: 100, status: 'low' },
    { id: 4, name: 'Болт M6x20', description: 'Болт с шестигранной головкой', currentStock: 35, minStock: 30, status: 'normal' },
    { id: 5, name: 'Подшипник 6202', description: 'Шариковый подшипник', currentStock: 55, minStock: 15, status: 'normal' },
  ]);

  const [operations] = useState<Operation[]>([
    { id: 1, materialId: 1, type: 'incoming', quantity: 50, timestamp: '2025-10-09T19:04:25' },
    { id: 2, materialId: 2, type: 'incoming', quantity: 200, timestamp: '2025-10-09T19:10:05' },
    { id: 3, materialId: 3, type: 'incoming', quantity: 150, timestamp: '2025-10-09T19:10:14' },
    { id: 4, materialId: 4, type: 'incoming', quantity: 25, timestamp: '2025-10-09T19:10:21' },
    { id: 5, materialId: 5, type: 'incoming', quantity: 10, timestamp: '2025-10-09T19:10:28' },
    { id: 6, materialId: 2, type: 'incoming', quantity: 100, timestamp: '2025-10-09T19:10:50' },
    { id: 7, materialId: 2, type: 'outgoing', quantity: 200, timestamp: '2025-10-09T19:10:58' },
    { id: 8, materialId: 2, type: 'outgoing', quantity: 30, timestamp: '2025-10-09T19:11:04' },
    { id: 9, materialId: 2, type: 'outgoing', quantity: 25, timestamp: '2025-10-09T19:12:14' },
    { id: 10, materialId: 1, type: 'incoming', quantity: 90, timestamp: '2025-10-09T19:13:30' },
  ]);

  const [orders] = useState<Order[]>([
    { id: 1, materialId: 2, quantity: 90, orderDate: '2025-10-09T19:11:04', status: 'completed' },
    { id: 2, materialId: 2, quantity: 115, orderDate: '2025-10-09T19:12:14', status: 'completed' },
    { id: 3, materialId: 4, quantity: 35, orderDate: '2025-10-09T19:19:36', status: 'completed' },
    { id: 4, materialId: 3, quantity: 150, orderDate: '2025-10-10T08:08:27', status: 'pending' },
  ]);

  const [newMaterial, setNewMaterial] = useState({ name: '', description: '', minStock: '' });

  const addMaterial = () => {
    if (newMaterial.name && newMaterial.description && newMaterial.minStock) {
      const material: Material = {
        id: materials.length + 1,
        name: newMaterial.name,
        description: newMaterial.description,
        currentStock: 0,
        minStock: parseInt(newMaterial.minStock),
        status: 'critical',
      };
      setMaterials([...materials, material]);
      setNewMaterial({ name: '', description: '', minStock: '' });
    }
  };

  const getMaterialName = (materialId: number) => {
    return materials.find(m => m.id === materialId)?.name || 'Неизвестно';
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      normal: 'bg-emerald-600 hover:bg-emerald-600 text-white',
      low: 'bg-amber-600 hover:bg-amber-600 text-white',
      critical: 'bg-red-600 hover:bg-red-600 text-white',
    };
    const labels = {
      normal: 'Норма',
      low: 'Низкий запас',
      critical: 'Критический',
    };
    return <Badge className={styles[status as keyof typeof styles]}>{labels[status as keyof typeof labels]}</Badge>;
  };

  const getOperationBadge = (type: string) => {
    return type === 'incoming' ? (
      <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white">ПОСТУПЛЕНИЕ</Badge>
    ) : (
      <Badge className="bg-amber-600 hover:bg-amber-600 text-white">СПИСАНИЕ</Badge>
    );
  };

  const getOrderStatusBadge = (status: string) => {
    return status === 'completed' ? (
      <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white">COMPLETED</Badge>
    ) : (
      <Badge className="bg-amber-600 hover:bg-amber-600 text-white">PENDING</Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Package" className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Система управления материальными потоками</h1>
        </div>

        <Tabs defaultValue="materials" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="materials" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Материалы
            </TabsTrigger>
            <TabsTrigger value="operations" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              История операций
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Заказы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="materials" className="space-y-6 mt-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-primary to-blue-600 text-white">
                <CardTitle className="text-xl">Добавить новый материал</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input
                    placeholder="Название"
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                    className="border-slate-300 focus:border-primary"
                  />
                  <Input
                    placeholder="Описание"
                    value={newMaterial.description}
                    onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                    className="border-slate-300 focus:border-primary"
                  />
                  <Input
                    placeholder="Мин. запас"
                    type="number"
                    value={newMaterial.minStock}
                    onChange={(e) => setNewMaterial({ ...newMaterial, minStock: e.target.value })}
                    className="border-slate-300 focus:border-primary"
                  />
                  <Button onClick={addMaterial} className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
                    Добавить материал
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="bg-white border-b border-slate-200">
                <CardTitle className="text-xl text-foreground">Список материалов на складе</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-100 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Название</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Описание</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Текущий запас</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Мин. запас</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Статус</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Действия</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {materials.map((material, index) => (
                        <tr
                          key={material.id}
                          className="hover:bg-slate-50 transition-colors duration-150"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="px-6 py-4 text-sm text-muted-foreground">{material.id}</td>
                          <td className="px-6 py-4 text-sm font-medium text-foreground">{material.name}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{material.description}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-foreground">{material.currentStock}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{material.minStock}</td>
                          <td className="px-6 py-4 text-sm">{getStatusBadge(material.status)}</td>
                          <td className="px-6 py-4">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2">
                              Операции
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6 mt-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-white border-b border-slate-200 flex flex-row items-center gap-3">
                <Icon name="ClipboardList" className="text-primary" size={24} />
                <CardTitle className="text-xl text-foreground">Все операции</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-100 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Material ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Тип</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Количество</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Время</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {operations.map((operation, index) => (
                        <tr
                          key={operation.id}
                          className="hover:bg-slate-50 transition-colors duration-150"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="px-6 py-4 text-sm text-muted-foreground">{operation.id}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{operation.materialId}</td>
                          <td className="px-6 py-4 text-sm">{getOperationBadge(operation.type)}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-foreground">{operation.quantity}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{operation.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6 mt-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-white border-b border-slate-200 flex flex-row items-center gap-3">
                <Icon name="ShoppingCart" className="text-primary" size={24} />
                <CardTitle className="text-xl text-foreground">Автоматически созданные заказы</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-100 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">ID заказа</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Material ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Количество</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Дата заказа</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Статус</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {orders.map((order, index) => (
                        <tr
                          key={order.id}
                          className="hover:bg-slate-50 transition-colors duration-150"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="px-6 py-4 text-sm text-muted-foreground">{order.id}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{order.materialId}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-foreground">{order.quantity}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{order.orderDate}</td>
                          <td className="px-6 py-4 text-sm">{getOrderStatusBadge(order.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Icon name="Info" className="text-blue-600 mt-0.5" size={20} />
                  <p className="text-sm text-blue-900">
                    <strong>Информация:</strong> Заказы автоматически закрываются при поступлении материалов выше минимального уровня
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
