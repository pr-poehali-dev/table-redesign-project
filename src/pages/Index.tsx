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
    { id: 1, name: 'Алюминиевый профиль 40x40', description: 'Профиль для каркасных конструкций', currentStock: 25, minStock: 50, status: 'low' },
    { id: 2, name: 'Листовая сталь 2мм', description: 'Холоднокатаный лист 1000x2000мм', currentStock: 8, minStock: 15, status: 'critical' },
    { id: 3, name: 'Электродвигатель АИР71', description: 'Асинхронный двигатель 0.55кВт', currentStock: 120, minStock: 30, status: 'normal' },
    { id: 4, name: 'Резиновый уплотнитель', description: 'Уплотнитель EPDM 10x5мм', currentStock: 450, minStock: 200, status: 'normal' },
    { id: 5, name: 'Промышленный клей ПВА', description: 'Клей для дерева 5кг', currentStock: 18, minStock: 25, status: 'low' },
    { id: 6, name: 'Подшипник SKF 6205', description: 'Радиальный шарикоподшипник', currentStock: 340, minStock: 100, status: 'normal' },
  ]);

  const [operations] = useState<Operation[]>([
    { id: 1, materialId: 3, type: 'incoming', quantity: 80, timestamp: '2025-11-14T08:15:00' },
    { id: 2, materialId: 1, type: 'incoming', quantity: 150, timestamp: '2025-11-14T09:22:14' },
    { id: 3, materialId: 4, type: 'outgoing', quantity: 120, timestamp: '2025-11-14T10:45:30' },
    { id: 4, materialId: 6, type: 'incoming', quantity: 200, timestamp: '2025-11-14T11:18:45' },
    { id: 5, materialId: 2, type: 'outgoing', quantity: 5, timestamp: '2025-11-14T13:05:12' },
    { id: 6, materialId: 5, type: 'incoming', quantity: 40, timestamp: '2025-11-14T14:30:28' },
    { id: 7, materialId: 1, type: 'outgoing', quantity: 75, timestamp: '2025-11-15T08:12:55' },
    { id: 8, materialId: 3, type: 'outgoing', quantity: 15, timestamp: '2025-11-15T09:40:18' },
    { id: 9, materialId: 4, type: 'incoming', quantity: 300, timestamp: '2025-11-15T11:25:00' },
    { id: 10, materialId: 2, type: 'incoming', quantity: 12, timestamp: '2025-11-15T15:10:42' },
    { id: 11, materialId: 6, type: 'outgoing', quantity: 60, timestamp: '2025-11-16T07:55:30' },
    { id: 12, materialId: 5, type: 'outgoing', quantity: 22, timestamp: '2025-11-16T10:20:05' },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    { id: 1, materialId: 1, quantity: 100, orderDate: '2025-11-12T14:30:00', status: 'pending' },
    { id: 2, materialId: 2, quantity: 20, orderDate: '2025-11-13T09:15:00', status: 'pending' },
    { id: 3, materialId: 5, quantity: 50, orderDate: '2025-11-14T16:45:00', status: 'pending' },
    { id: 4, materialId: 1, quantity: 80, orderDate: '2025-11-10T11:20:00', status: 'completed' },
    { id: 5, materialId: 6, quantity: 150, orderDate: '2025-11-08T08:00:00', status: 'completed' },
  ]);

  const [newMaterial, setNewMaterial] = useState({ name: '', description: '', minStock: '' });
  const [newOrder, setNewOrder] = useState({ materialId: '', quantity: '' });

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

  const addOrder = () => {
    if (newOrder.materialId && newOrder.quantity) {
      const order: Order = {
        id: orders.length + 1,
        materialId: parseInt(newOrder.materialId),
        quantity: parseInt(newOrder.quantity),
        orderDate: new Date().toISOString(),
        status: 'pending',
      };
      setOrders([...orders, order]);
      setNewOrder({ materialId: '', quantity: '' });
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
      <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white">Выполнен</Badge>
    ) : (
      <Badge className="bg-amber-600 hover:bg-amber-600 text-white">В обработке</Badge>
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
              <CardHeader className="bg-gradient-to-r from-primary to-blue-600 text-white">
                <CardTitle className="text-xl">Создать заказ вручную</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    value={newOrder.materialId}
                    onChange={(e) => setNewOrder({ ...newOrder, materialId: e.target.value })}
                    className="border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
                  >
                    <option value="">Выберите материал</option>
                    {materials.map((material) => (
                      <option key={material.id} value={material.id}>
                        {material.name}
                      </option>
                    ))}
                  </select>
                  <Input
                    placeholder="Количество"
                    type="number"
                    value={newOrder.quantity}
                    onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                    className="border-slate-300 focus:border-primary"
                  />
                  <Button onClick={addOrder} className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
                    Создать заказ
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="bg-white border-b border-slate-200 flex flex-row items-center gap-3">
                <Icon name="ShoppingCart" className="text-primary" size={24} />
                <CardTitle className="text-xl text-foreground">Список заказов</CardTitle>
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

            <Card className="shadow-lg border-0 bg-amber-50 border-amber-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Icon name="AlertTriangle" className="text-amber-600 mt-0.5" size={20} />
                  <p className="text-sm text-amber-900">
                    <strong>Внимание!</strong> Для материалов с низким запасом были автоматически созданы новые заказы
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