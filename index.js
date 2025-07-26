import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Home, 
  Calendar, 
  Trophy, 
  ShoppingBag, 
  User, 
  Bell, 
  Settings, 
  ArrowLeft, 
  Star, 
  Heart, 
  Play, 
  Filter,
  Search,
  CreditCard,
  Globe,
  Moon,
  Sun,
  HelpCircle,
  Edit3,
  Camera,
  Medal,
  TrendingUp,
  Users,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle,
  Plus,
  Minus,
  X
} from 'lucide-react';

// Global App Context
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'Айдар Касымов',
    role: 'athlete', // athlete, coach, parent
    avatar: '/api/placeholder/100/100',
    level: 'Синий пояс',
    xp: 1250,
    streak: 12,
    totalTrainings: 89,
    competitions: 5,
    wins: 3,
    email: 'aidar@example.com',
    phone: '+7 (777) 123-45-67',
    parentName: 'Мария Касымова',
    parentPhone: '+7 (777) 987-65-43',
    subscription: 'premium'
  });

  const [currentScreen, setCurrentScreen] = useState('home');
  const [settings, setSettings] = useState({
    language: 'kz',
    theme: 'light',
    notifications: true,
    pushEnabled: true
  });
  
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'training', title: 'Напоминание о тренировке', text: 'Тренировка начинается через 1 час', time: '10 мин назад', read: false },
    { id: 2, type: 'achievement', title: 'Новое достижение!', text: 'Вы получили пояс "Синий"', time: '2 часа назад', read: false },
    { id: 3, type: 'tournament', title: 'Регистрация открыта', text: 'Чемпионат Астаны 2025', time: '1 день назад', read: true }
  ]);

  const [trainings, setTrainings] = useState([
    { id: 1, name: 'Грэпплинг для начинающих', coach: 'Нурлан Жумабеков', time: '18:00-19:30', date: '2025-07-27', spots: 8, enrolled: false, price: 3500 },
    { id: 2, name: 'Продвинутая техника', coach: 'Асхат Бекболов', time: '19:30-21:00', date: '2025-07-27', spots: 3, enrolled: true, price: 4000 },
    { id: 3, name: 'Детская группа', coach: 'Алия Сарсенова', time: '16:00-17:00', date: '2025-07-28', spots: 12, enrolled: false, price: 2500 }
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'AIGA Rashguard Black', price: 12500, image: '/api/placeholder/200/200', category: 'rashguards', inStock: true, description: 'Профессиональный рашгард для тренировок' },
    { id: 2, name: 'AIGA Kimono White', price: 35000, image: '/api/placeholder/200/200', category: 'kimono', inStock: true, description: 'Традиционное кимоно высшего качества' },
    { id: 3, name: 'AIGA Shorts Black', price: 8500, image: '/api/placeholder/200/200', category: 'shorts', inStock: false, description: 'Удобные шорты для грэпплинга' },
    { id: 4, name: 'AIGA Cap Red', price: 4500, image: '/api/placeholder/200/200', category: 'accessories', inStock: true, description: 'Стильная кепка с логотипом' }
  ]);

  const [savedCards, setSavedCards] = useState([
    { id: 1, number: '**** **** **** 1234', type: 'Visa', expiry: '12/26', isDefault: true },
    { id: 2, number: '**** **** **** 5678', type: 'Kaspi', expiry: '08/27', isDefault: false }
  ]);

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      currentScreen, setCurrentScreen,
      settings, setSettings,
      cart, setCart,
      notifications, setNotifications,
      trainings, setTrainings,
      products, setProducts,
      savedCards, setSavedCards
    }}>
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

// Language translations
const translations = {
  kz: {
    home: 'Басты бет',
    schedule: 'Кесте',
    progress: 'Прогресс',
    shop: 'Дүкен',
    profile: 'Профиль',
    notifications: 'Хабарландырулар',
    settings: 'Баптаулар',
    language: 'Тіл',
    theme: 'Тақырып',
    paymentMethods: 'Төлем әдістері',
    help: 'Көмек',
    logout: 'Шығу'
  },
  ru: {
    home: 'Главная',
    schedule: 'Расписание',
    progress: 'Прогресс',
    shop: 'Магазин',
    profile: 'Профиль',
    notifications: 'Уведомления',
    settings: 'Настройки',
    language: 'Язык',
    theme: 'Тема',
    paymentMethods: 'Способы оплаты',
    help: 'Помощь',
    logout: 'Выйти'
  },
  en: {
    home: 'Home',
    schedule: 'Schedule',
    progress: 'Progress',
    shop: 'Shop',
    profile: 'Profile',
    notifications: 'Notifications',
    settings: 'Settings',
    language: 'Language',
    theme: 'Theme',
    paymentMethods: 'Payment Methods',
    help: 'Help',
    logout: 'Logout'
  }
};

// Utility Components
const Button = ({ children, variant = 'primary', size = 'md', onClick, disabled, className = '' }) => {
  const baseClasses = 'rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2';
  const variants = {
    primary: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    outline: 'border-2 border-red-600 text-red-600 hover:bg-red-50',
    ghost: 'text-gray-600 hover:bg-gray-100'
  };
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '', onClick }) => (
  <div 
    className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

const Header = ({ title, leftIcon, rightIcon, onLeftClick, onRightClick }) => (
  <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
    <div className="flex items-center gap-3">
      {leftIcon && (
        <button onClick={onLeftClick} className="p-2 hover:bg-gray-100 rounded-lg">
          {leftIcon}
        </button>
      )}
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
    </div>
    {rightIcon && (
      <button onClick={onRightClick} className="p-2 hover:bg-gray-100 rounded-lg">
        {rightIcon}
      </button>
    )}
  </div>
);

// Role-based content helper
const getRoleSpecificContent = (role) => {
  const content = {
    athlete: {
      mainActions: [
        { id: 'book-training', title: 'Записаться на тренировку', icon: Calendar, color: 'bg-blue-500' },
        { id: 'view-progress', title: 'Мой прогресс', icon: TrendingUp, color: 'bg-green-500' },
        { id: 'tournaments', title: 'Турниры', icon: Trophy, color: 'bg-yellow-500' },
        { id: 'techniques', title: 'Техники', icon: Play, color: 'bg-purple-500' }
      ],
      dashboardStats: [
        { label: 'Тренировок', value: '89', icon: Calendar },
        { label: 'Побед', value: '3', icon: Trophy },
        { label: 'Дни подряд', value: '12', icon: TrendingUp }
      ]
    },
    coach: {
      mainActions: [
        { id: 'manage-groups', title: 'Мои группы', icon: Users, color: 'bg-blue-500' },
        { id: 'schedule-training', title: 'Создать тренировку', icon: Plus, color: 'bg-green-500' },
        { id: 'student-progress', title: 'Прогресс учеников', icon: TrendingUp, color: 'bg-yellow-500' },
        { id: 'messages', title: 'Сообщения', icon: MessageCircle, color: 'bg-purple-500' }
      ],
      dashboardStats: [
        { label: 'Учеников', value: '24', icon: Users },
        { label: 'Групп', value: '4', icon: Calendar },
        { label: 'Рейтинг', value: '4.9', icon: Star }
      ]
    },
    parent: {
      mainActions: [
        { id: 'child-progress', title: 'Прогресс ребенка', icon: TrendingUp, color: 'bg-blue-500' },
        { id: 'book-training', title: 'Записать на тренировку', icon: Calendar, color: 'bg-green-500' },
        { id: 'payments', title: 'Оплата', icon: CreditCard, color: 'bg-yellow-500' },
        { id: 'chat-coach', title: 'Связь с тренером', icon: MessageCircle, color: 'bg-purple-500' }
      ],
      dashboardStats: [
        { label: 'Посещений', value: '23', icon: Calendar },
        { label: 'Уровень', value: 'Синий', icon: Medal },
        { label: 'Достижений', value: '8', icon: Trophy }
      ]
    }
  };

  return content[role] || content.athlete;
};

// Home Screen
const HomeScreen = () => {
  const { currentUser, settings, currentScreen, setCurrentScreen } = useApp();
  const t = translations[settings.language];
  const roleContent = getRoleSpecificContent(currentUser.role);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Доброе утро';
    if (hour < 18) return 'Добрый день';
    return 'Добрый вечер';
  };

  const getMotivationalQuote = () => {
    const quotes = [
      'Каждая тренировка приближает к цели',
      'Сила духа важнее физической силы',
      'Грэпплинг - это шахматы тела',
      'Дисциплина побеждает талант'
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <div className="pb-20">
      <Header 
        title={`${getGreeting()}, ${currentUser.name.split(' ')[0]}!`}
        rightIcon={<Bell className="w-6 h-6" />}
        onRightClick={() => setCurrentScreen('notifications')}
      />
      
      <div className="p-4 space-y-6">
        {/* XP Progress Card */}
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-red-100 text-sm">Текущий уровень</p>
              <p className="text-xl font-bold">{currentUser.level}</p>
            </div>
            <div className="text-right">
              <p className="text-red-100 text-sm">XP</p>
              <p className="text-xl font-bold">{currentUser.xp}/1500</p>
            </div>
          </div>
          <div className="w-full bg-red-400 bg-opacity-50 rounded-full h-3">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentUser.xp / 1500) * 100}%` }}
            ></div>
          </div>
          <p className="text-red-100 text-sm mt-2">{1500 - currentUser.xp} XP до следующего уровня</p>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {roleContent.dashboardStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-red-600" />
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Motivational Quote */}
        <Card className="bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Мотивация дня</p>
              <p className="text-sm text-gray-600">{getMotivationalQuote()}</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Быстрые действия</h2>
          <div className="grid grid-cols-2 gap-3">
            {roleContent.mainActions.map((action) => (
              <Card 
                key={action.id}
                className="text-center cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  if (action.id === 'book-training') setCurrentScreen('schedule');
                  else if (action.id === 'view-progress' || action.id === 'child-progress') setCurrentScreen('progress');
                  else if (action.id === 'tournaments') setCurrentScreen('tournaments');
                  else if (action.id === 'payments') setCurrentScreen('payments');
                }}
              >
                <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-900">{action.title}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Сегодня</h2>
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Продвинутая техника</p>
                <p className="text-sm text-gray-600">19:30-21:00 • Асхат Бекболов</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Schedule Screen
const ScheduleScreen = () => {
  const { trainings, setTrainings, currentUser, setCurrentScreen } = useApp();
  const [selectedDate, setSelectedDate] = useState('2025-07-27');
  const [filter, setFilter] = useState('all');

  const handleBookTraining = (trainingId) => {
    setTrainings(prev => 
      prev.map(training => 
        training.id === trainingId 
          ? { ...training, enrolled: !training.enrolled, spots: training.enrolled ? training.spots + 1 : training.spots - 1 }
          : training
      )
    );
  };

  const filteredTrainings = trainings.filter(training => {
    if (filter === 'available') return !training.enrolled && training.spots > 0;
    if (filter === 'enrolled') return training.enrolled;
    return true;
  });

  return (
    <div className="pb-20">
      <Header 
        title="Расписание тренировок"
        leftIcon={<ArrowLeft className="w-6 h-6" />}
        onLeftClick={() => setCurrentScreen('home')}
        rightIcon={<Filter className="w-6 h-6" />}
      />
      
      <div className="p-4 space-y-4">
        {/* Date Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['2025-07-27', '2025-07-28', '2025-07-29'].map(date => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg ${
                selectedDate === date 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {new Date(date).toLocaleDateString('ru', { day: 'numeric', month: 'short' })}
            </button>
          ))}
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'Все' },
            { key: 'available', label: 'Доступные' },
            { key: 'enrolled', label: 'Записан' }
          ].map(filterOption => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === filterOption.key
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>

        {/* Training List */}
        <div className="space-y-3">
          {filteredTrainings.map(training => (
            <Card key={training.id}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{training.name}</h3>
                  <p className="text-sm text-gray-600">Тренер: {training.coach}</p>
                  <p className="text-sm text-gray-600">
                    {training.time} • {training.spots} мест
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{training.price} ₸</p>
                  {training.enrolled && (
                    <p className="text-sm text-green-600 font-medium">Записан</p>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={training.enrolled ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => handleBookTraining(training.id)}
                  disabled={!training.enrolled && training.spots === 0}
                  className="flex-1"
                >
                  {training.enrolled ? 'Отменить запись' : training.spots > 0 ? 'Записаться' : 'Нет мест'}
                </Button>
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Progress Screen
const ProgressScreen = () => {
  const { currentUser, setCurrentScreen } = useApp();
  
  const achievements = [
    { id: 1, name: 'Первая победа', description: 'Выиграть первый турнир', completed: true, date: '2024-12-15' },
    { id: 2, name: 'Постоянство', description: '30 дней тренировок подряд', completed: true, date: '2025-01-20' },
    { id: 3, name: 'Синий пояс', description: 'Получить синий пояс', completed: true, date: '2025-03-10' },
    { id: 4, name: 'Наставник', description: 'Помочь новичку', completed: false, progress: 60 },
    { id: 5, name: 'Чемпион', description: 'Выиграть 5 турниров', completed: false, progress: 60 }
  ];

  const monthlyStats = [
    { month: 'Янв', trainings: 12, wins: 1 },
    { month: 'Фев', trainings: 15, wins: 0 },
    { month: 'Мар', trainings: 18, wins: 2 },
    { month: 'Апр', trainings: 14, wins: 0 },
    { month: 'Май', trainings: 16, wins: 1 },
    { month: 'Июн', trainings: 20, wins: 1 }
  ];

  return (
    <div className="pb-20">
      <Header 
        title="Мой прогресс"
        leftIcon={<ArrowLeft className="w-6 h-6" />}
        onLeftClick={() => setCurrentScreen('home')}
      />
      
      <div className="p-4 space-y-6">
        {/* Current Level */}
        <Card className="text-center">
          <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Medal className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{currentUser.level}</h2>
          <p className="text-gray-600">Следующий: Фиолетовый пояс</p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
            <div className="bg-blue-500 h-3 rounded-full" style={{ width: '73%' }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">73% до следующего уровня</p>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold text-gray-900">{currentUser.totalTrainings}</p>
            <p className="text-sm text-gray-600">Всего тренировок</p>
          </Card>
          <Card className="text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
            <p className="text-2xl font-bold text-gray-900">{currentUser.wins}/{currentUser.competitions}</p>
            <p className="text-sm text-gray-600">Побед/Турниров</p>
          </Card>
        </div>

        {/* Monthly Chart */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Активность по месяцам</h3>
          <div className="flex items-end justify-between h-32 gap-2">
            {monthlyStats.map((stat, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t">
                  <div 
                    className="bg-red-500 rounded-t transition-all duration-500"
                    style={{ height: `${(stat.trainings / 20) * 80}px` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{stat.month}</p>
                <p className="text-xs font-medium">{stat.trainings}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Достижения</h3>
          <div className="space-y-3">
            {achievements.map(achievement => (
              <Card key={achievement.id}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.completed ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {achievement.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Medal className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    {achievement.completed ? (
                      <p className="text-xs text-green-600">Получено {achievement.date}</p>
                    ) : (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{achievement.progress}%</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Shop Screen with full functionality
const ShopScreen = () => {
  const { products, cart, setCart, setCurrentScreen } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'all', label: 'Все' },
    { key: 'kimono', label: 'Кимоно' },
    { key: 'rashguards', label: 'Рашгарды' },
    { key: 'shorts', label: 'Шорты' },
    { key: 'accessories', label: 'Аксессуары' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product, size = 'M', quantity = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id && item.size === size);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, size, quantity, cartId: Date.now() }];
    });
  };

  if (selectedProduct) {
    return <ProductDetailScreen product={selectedProduct} onBack={() => setSelectedProduct(null)} addToCart={addToCart} />;
  }

  return (
    <div className="pb-20">
      <Header 
        title="Магазин AIGA"
        leftIcon={<ArrowLeft className="w-6 h-6" />}
        onLeftClick={() => setCurrentScreen('home')}
        rightIcon={
          <div className="relative">
            <ShoppingBag className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
        }
        onRightClick={() => setCurrentScreen('cart')}
      />
      
      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg ${
                selectedCategory === category.key 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map(product => (
            <Card 
              key={product.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
              </div>
              <h3 className="font-medium text-gray-900 text-sm mb-1">{product.name}</h3>
              <p className="text-lg font-bold text-red-600">{product.price.toLocaleString()} ₸</p>
              {!product.inStock && (
                <p className="text-sm text-red-500 mt-1">Нет в наличии</p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Product Detail Screen
const ProductDetailScreen = ({ product, onBack, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="pb-20">
      <Header 
        title={product.name}
        leftIcon={<ArrowLeft className="w-6 h-6" />}
        onLeftClick={onBack}
        rightIcon={<Heart className="w-6 h-6" />}
      />
      
      <div className="space-y-6">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 flex items-center justify-center">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="p-4 space-y-6">
          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-3xl font-bold text-red-600 mb-4">{product.price.toLocaleString()} ₸</p>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Size Selection */}
          {product.category !== 'accessories' && (
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Размер</h3>
              <div className="flex gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 ${
                      selectedSize === size
                        ? 'border-red-600 bg-red-50 text-red-600'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Количество</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xl font-medium w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            variant="primary"
            size="lg"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full"
          >
            {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
          </Button>

          {/* Success Message */}
          {showSuccess && (
            <div className="fixed top-20 left-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Товар добавлен в корзину!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Cart Screen
const CartScreen = () => {
  const { cart, setCart, setCurrentScreen } = useApp();
  
  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(prev => prev.filter(item => item.cartId !== cartId));
    } else {
      setCart(prev => prev.map(item =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="pb-20">
        <Header 
          title="Корзина"
          leftIcon={<ArrowLeft className="w-6 h-6" />}
          onLeftClick={() => setCurrentScreen('shop')}
        />
        <div className="flex flex-col items-center justify-center h-96">
          <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg mb-4">Корзина пуста</p>
          <Button onClick={() => setCurrentScreen('shop')}>
            Перейти в магазин
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <Header 
        title="Корзина"
        leftIcon={<ArrowLeft className="w-6 h-6" />}
        onLeftClick={() => setCurrentScreen('shop')}
      />
      
      <div className="p-4 space-y-4">
        {cart.map(item => (
          <Card key={item.cartId}>
            <div className="flex gap-3">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">Размер: {item.size}</p>
                <p className="text-lg font-bold text-red-600">{item.price.toLocaleString()} ₸</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => updateQuantity(item.cartId, 0)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                    className="w-8 h-8 rounded border flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                    className="w-8 h-8 rounded border flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Checkout Bottom Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-medium">Итого:</span>
          <span className="text-2xl font-bold text-red-600">{totalAmount.toLocaleString()} ₸</span>
        </div>
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => setCurrentScreen('checkout')}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

// Checkout Screen
const CheckoutScreen = () => {
  const { cart, savedCards, setCurrentScreen, setCart } = useApp();
  const [selectedCard, setSelectedCard] = useState(savedCards.find(card => card.isDefault)?.id || savedCards[0]?.id);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 1000;
  const finalAmount = totalAmount + deliveryFee;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setCart([]);
      setCurrentScreen('home');
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Заказ оформлен!</h2>
        <p className="text-gray-600 text-center mb-4">
          Ваш заказ №{Math.floor(Math.random() * 10000)} принят в обработку.
        </p>
        <p className="text-sm text-gray-500">Перенаправление на главную...</p>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <Header 
        title="Оформление заказа"
        leftIcon={<ArrowLeft className="w-6 h-6" />}
        onLeftClick={() => setCurrentScreen('cart')}
      />
      
      <div className="p-4 space-y-6">
        {/* Order Summary */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Ваш заказ</h3>
          {cart.map(item => (
            <div key={item.cartId} className="flex justify-between items-center py-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">{item.size} × {item.quantity}</p>
              </div>
              <p className="font-medium">{(item.price * item.quantity).toLocaleString()} ₸</p>
            </div>
          ))}
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between">
              <span>Товары:</span>
              <span>{totalAmount.toLocaleString()} ₸</span>
            </div>
            <div className="flex justify-between">
              <span>Доставка:</span>
              <span>{deliveryFee.toLocaleString()} ₸</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Итого:</span>
              <span>{finalAmount.toLocaleString()} ₸</span>
            </div>
          </div>
        </Card>

        {/* Delivery Options */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Способ получения</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="radio" name="delivery" defaultChecked className="text-red-600" />
              <div>
                <p className="font-medium">Самовывоз из зала</p>
                <p className="text-sm text-gray-600">ул. Ахмедьярова, 3 • Бесплатно</p>
              </div>
            </label>
            <label className="flex items-center gap-3">
              <input type="radio" name="delivery" className="text-red-600" />
              <div>
                <p className="font-medium">Доставка курьером</p>
                <p className="text-sm text-gray-600">По Астане • 1,000 ₸</p>
              </div>
            </label>
          </div>
        </Card>

        {/* Payment Method */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Способ оплаты</h3>
          <div className="space-y-3">
            {savedCards.map(card => (
              <label key={card.id} className="flex items-center gap-3">
                <input 
                  type="radio" 
                  name="payment" 
                  checked={selectedCard === card.id}
                  onChange={() => setSelectedCard(card.id)}
                  className="text-red-600" 
                />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                    {card.type}
                  </div>
                  <div>
                    <p className="font-medium">{card.number}</p>
                    <p className="text-sm text-gray-600">{card.expiry}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </Card>
      </div>

      {/* Place Order Button */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handlePlaceOrder}
        >
          Оплатить {finalAmount.toLocaleString()} ₸
        </Button>
      </div>
    </div>
  );
};

// Profile Screen
const ProfileScreen = () => {
  const { currentUser, setCurrentUser, setCurrentScreen } = useApp();
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone
  });

  const handleSave = () => {
    setCurrentUser(prev => ({ ...prev, ...editData }));
    setEditing(false);
  };

  const menuItems = [
    { id: 'notifications', icon: Bell, label: 'Уведомления', action: () => setCurrentScreen('notifications') },
    { id: 'settings', icon: Settings, label: 'Настройки', action: () => setCurrentScreen('settings') },
    { id: 'payment', icon: CreditCard, label: 'Способы оплаты', action: () => setCurrentScreen('payment-methods') },
    { id: 'help', icon: HelpCircle, label: 'Помощь', action: () => setCurrentScreen('help') }
  ];

  return (
    <div className="pb-20">
      <Header 
        title="Профиль"
        rightIcon={editing ? <CheckCircle className="w-6 h-6" /> : <Edit3 className="w-6 h-6" />}
        onRightClick={editing ? handleSave : () => setEditing(true)}
      />
      
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <Card className="text-center">
          <div className="relative inline-block mb-4">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="w-24 h-24 rounded-full mx-auto"
            />
            {editing && (
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
          
          {editing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full text-center text-xl font-bold border-b-2 border-gray-200 focus:border-red-500 outline-none"
              />
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full text-center text-gray-600 border-b-2 border-gray-200 focus:border-red-500 outline-none"
              />
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full text-center text-gray-600 border-b-2 border-gray-200 focus:border-red-500 outline-none"
              />
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900">{currentUser.name}</h2>
              <p className="text-gray-600">{currentUser.email}</p>
              <p className="text-gray-600">{currentUser.phone}</p>
            </>
          )}
          
          <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-lg font-bold text-red-600">{currentUser.level}</p>
              <p className="text-sm text-gray-600">Уровень</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-red-600">{currentUser.streak}</p>
              <p className="text-sm text-gray-600">Дней подряд</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-red-600">{currentUser.totalTrainings}</p>
              <p className="text-sm text-gray-600">Тренировок</p>
            </div>
          </div>
        </Card>

        {/* Role-specific info */}
        {currentUser.role === 'parent' && (
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Данные родителя</h3>
            <div className="space-y-2">
              <p><span className="text-gray-600">Ребенок:</span> {currentUser.name}</p>
              <p><span className="text-gray-600">Родитель:</span> {currentUser.parentName}</p>
              <p><span className="text-gray-600">Телефон:</span> {currentUser.parentPhone}</p>
            </div>
          </Card>
        )}

        {/* Subscription Info */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900">Подписка</h3>
              <p className="text-gray-600 capitalize">{currentUser.subscription}</p>
            </div>
            <Button variant="outline" size="sm">
              Изменить
            </Button>
          </div>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map(item => (
            <Card key={item.id} className="cursor-pointer hover:bg-gray-50" onClick={item.action}>
              <div className="flex items-center gap-3">
                <item.icon className="w-6 h-6 text-gray-600" />
                <span className="font-medium text-gray-900">{item.label}</span>
                <ArrowLeft className="w-5 h-5 text-gray-400 ml-auto rotate-180" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Settings Screen with working functionality
const SettingsScreen = () => {
  const { settings, setSettings, setCurrentScreen } = useApp();

  const handleLanguageChange = (language) => {
    setSettings(prev => ({ ...prev, language }));
  };

  const handleThemeChange = (theme) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const handleNotificationToggle = () => {
    setSettings(prev => ({ ...prev, notifications: !prev.notifications }));
  };

  return (
    <div className="pb-20">
      <Header 
        title="Настройки"
        leftIcon={<ArrowLeft className="w-6 h-6" />}
        onLeftClick={() => setCurrentScreen('profile')}
      />
      
      <div className="p-4 space-y-6">
        {/* Language Settings */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Язык интерфейса
          </h3>
          <div className="space-y-3">
            {[
              { code: 'kz', name: 'Қазақша', flag: '🇰🇿' },
              { code: 'ru', name: 'Русский', flag: '🇷🇺' },
              { code: 'en', name: 'English', flag: '🇺🇸' }
            ].map(lang => (
              <label key={lang.code} className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="language" 
                  checked={settings.language === lang.code}
                  onChange={() => handleLanguageChange(lang.code)}
                  className="text-red-600" 
                />
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Theme Settings */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            {settings.theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            Тема приложения
          </h3>
          <div className="space-y-3">
            {[
              { code: 'light', name: 'Светлая', icon: Sun },
              { code: 'dark', name: 'Темная', icon: Moon }
            ].map(theme => (
              <label key={theme.code} className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="theme" 
                  checked={settings.theme === theme.code}
                  onChange={() => handleThemeChange(theme.code)}
                  className="text-red-600" 
                />
                <theme.icon className="w-5 h-5 text-gray-600" />
                <span className="font-medium">{theme.name}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Notification Settings */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Уведомления
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push-уведомления</p>
                <p className="text-sm text-gray-600">Получать уведомления на устройство</p>
              </div>
              <button
                onClick={handleNotificationToggle}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.notifications ? 'bg-red-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="space-y-3 pl-4 border-l-2 border-gray-100">
              {[
                'Напоминания о тренировках',
                'Новые турниры',
                'Достижения и прогресс',
                'Акции в магазине'
              ].map((option, index) => (
                <label key={index} className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    defaultChecked={settings.notifications}
                    disabled={!settings.notifications}
                    className="text-red-600" 
                  />
                  <span className={`text-sm ${!settings.notifications ? 'text-gray-400' : ''}`}>
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </Card>

        {/* App Info */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">О приложении</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Версия:</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Последнее обновление:</span>
              <span>26.07.2025</span>
            </div>
            <div className="flex justify-between">
              <span>Разработчик:</span>
              <span>AIGA Academy</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Payment Methods Screen
const PaymentMethodsScreen = () => {
  const { savedCards, setSavedCards, setCurrentScreen } = useApp();
  const [showAddCard, setShowAddCard] = useState(false);

  const deleteCard = (cardId) => {
    setSavedCards(prev => prev.filter(card => card.id !== cardId));
  };

  const setDefaultCard = (cardId) => {
    setSavedCards(prev => prev.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
  };

  if (showAddCard) {
    return <AddCardScreen onBack={() => setShowAddCard(false)} onAdd={(newCard) => {
      setSavedCards(prev => [...prev, { ...newCard, id: Date.now() }]);
      setShowAddCard(false);
    }} />;
  }

  return (
    <div className="pb-20">
      <Header 
        title="Способы оплаты"
        leftIcon={<ArrowLeft className="w-6 h-6" />}
        onLeftClick={() => setCurrentScreen('profile')}
        rightIcon={<Plus className="w-6 h-6" />}
        onRightClick={() => setShowAddCard(true)}
      />
      
      <div className="p-4 space-y-4">
        {savedCards.map(card => (
          <Card key={card.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-8 rounded flex items-center justify-center text-white text-xs font-bold ${
                  card.type === 'Visa' ? 'bg-blue-600' : 
                  card.type === 'Kaspi' ? 'bg-red-600' : 'bg-gray-600'
                }`}>
                  {card.type}
                </div>
                <div>
                  <p className="font-medium">{card.number}</p>
                  <p className="text-sm text-gray-600">Истекает {card.expiry}</p>
                  {card.isDefault && (
                    <p className="text-xs text-green-600 font-medium">По умолчанию</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {!card.isDefault && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setDefaultCard(card.id)}
                  >
                    Сделать основной
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => deleteCard(card.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {savedCards.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Нет сохраненных карт</p>
            <Button onClick={() => setShowAddCard(true)}>
              Добавить карту
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Add Card Screen
const AddCardScreen = ({ onBack, onAdd }) => {
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    type: ''
  });

  const detectCardType = (number) => {
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5')) return 'Mastercard';
    if (number.startsWith('6')) return 'Kaspi';
    return 'Unknown';
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = () => {
    const newCard = {
      number: '**** **** **** ' + cardData.number.slice(-4),
      expiry: cardData.expiry,
      type: detectCardType(cardData.number.replace(/\s/g, '')),
      isDefault: false
    };
    onAdd(newCard);
  };

  return (
    <div className="pb-20">
      <Header 
        title="Добавить карту"
        leftIcon={<ArrowLeft className="w-6 h-6" />}
        onLeftClick={onBack}
      />
      
      <div className="p-4 space-y-6">
        {/* Card Preview */}
        <div className={`w-full h-48 rounded-xl p-6 text-white relative overflow-hidden ${
          detectCardType(cardData.number.replace(/\s/g, '')) === 'Visa' ? 'bg-gradient-to-br from-blue-500 to-blue-700' :
          detectCardType(cardData.number.replace(/\s/g, '')) === 'Kaspi' ? 'bg-gradient-to-br from-red-500 to-red-700' :
          'bg-gradient-to-br from-gray-500 to-gray-700'
        }`}>
          <div className="flex justify-between items-start mb-8">
            <div className="text-2xl font-bold">
              {detectCardType(cardData.number.replace(/\s/g, '')) || 'CARD'}
            </div>
            <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full"></div>
          </div>
          <div className="space-y-4">
            <p className="text-xl font-mono tracking-wider">
              {cardData.number || '**** **** **** ****'}
            </p>
            <div className="flex justify-between">
              <div>
                <p className="text-xs opacity-80">CARD HOLDER</p>
                <p className="font-medium">{cardData.name || 'YOUR NAME'}</p>
              </div>
              <div>
                <p className="text-xs opacity-80">EXPIRES</p>
                <p className="font-medium">{cardData.expiry || 'MM/YY'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Номер карты
            </label>
            <input
              type="text"
              value={cardData.number}
              onChange={(e) => setCardData(prev => ({ 
                ...prev, 
                number: formatCardNumber(e.target.value) 
              }))}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Срок действия
              </label>
              <input
                type="text"
                value={cardData.expiry}
                onChange={(e) => setCardData(prev => ({ 
                  ...prev, 
                  expiry: formatExpiry(e.target.value) 
                }))}
                placeholder="MM/YY"
                maxLength="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="text"
                value={cardData.cvv}
                onChange={(e) => setCardData(prev => ({ 
                  ...prev, 
                  cvv: e.target.value.replace(/\D/g, '').slice(0, 3) 
                }))}
                placeholder="123"
                maxLength="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя владельца
            </label>
            <input
              type="text"
              value={cardData.name}
              onChange={(e) => setCardData(prev => ({ 
                ...prev, 
                name: e.target.value.toUpperCase() 
              }))}
              placeholder="AIDAR KASYMOV"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            disabled={!cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name}
            className="w-full mt-6"
          >
            Добавить карту
          </Button>
        </div>
      </div>
    </div>
  );
};

// Help Screen
const HelpScreen = () => {
  const { setCurrentScreen } = useApp();
  const [selectedFaq, setSelectedFaq] = useState(null);

  const faqData = [
    {
      id: 1,
      question: 'Как записаться на тренировку?',
      answer: 'Перейдите в раздел "Расписание", выберите подходящую тренировку и нажмите "Записаться". Оплата происходит при посещении зала.'
    },
    {
      id: 2,
      question: 'Как отменить запись?',
      answer: 'В разделе "Расписание" найдите тренировку, на которую записаны, и нажмите "Отменить запись". Отмена возможна за 2 часа до начала.'
    },
    {
      id: 3,
      question: 'Как получить пояс следующего уровня?',
      answer: 'Пояса присваиваются тренером на основе ваших навыков, посещаемости и участия в турнирах. Прогресс отображается в разделе "Прогресс".'
    },
    {
      id: 4,
      question: 'Проблемы с оплатой в магазине',
      answer: 'Проверьте данные карты в разделе "Способы оплаты". При сохранении проблем обратитесь к администратору зала.'
    },
    {
      id: 5,
      question: 'Не приходят уведомления',
      answer: 'Проверьте настройки уведомлений в разделе "Настройки" и убедитесь, что push-уведомления включены в настройках телефона.'
    }
  ];

  return (
    <div className="pb-20">
      <Header 
        title="Помощь и поддержка"
        leftIcon={<ArrowLeft className="w-6 h-6" />}
        onLeftClick={() => setCurrentScreen('profile')}
      />
      
      <div className="p-4 space-y-6">
        {/* Contact Info */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Связаться с нами</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">WhatsApp</p>
                <p className="text-sm text-gray-600">+7 (777) 123-45-67</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Адрес зала</p>
                <p className="text-sm text-gray-600">ул. Ахмедьярова, 3, Астана</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Время работы</p>
                <p className="text-sm text-gray-600">Пн-Вс: 06:00-23:00</p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h3>
          <div className="space-y-2">
            {faqData.map(faq => (
              <Card key={faq.id} className="cursor-pointer" onClick={() => 
                setSelectedFaq(selectedFaq === faq.id ? null : faq.id)
              }>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{faq.question}</p>
                  <ArrowLeft className={`w-5 h-5 text-gray-400 transition-transform ${
                    selectedFaq === faq.id ? 'rotate-90' : '-rotate-90'
                  }`} />
                </div>
                {selectedFaq === faq.id && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Report Problem */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Сообщить о проблеме</h3>
          <textarea
            placeholder="Опишите проблему..."
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4"
          />
          <Button variant="primary" size="lg" className="w-full">
            Отправить
          </Button>
        </Card>
      </div>
    </div>
  );
};

// Notifications Screen
const NotificationsScreen = () => {
  const { notifications, setNotifications, setCurrentScreen } = useApp();

  const markAsRead = (notificationId) => {
    setNotifications(prev => prev.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'training': return Calendar;
      case 'achievement': return Trophy;
      case 'tournament': return Medal;
      default: return Bell;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'training': return 'bg-blue-100 text-blue-600';
      case 'achievement': return 'bg-green-100 text-green-600';
      case 'tournament': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="pb-20">
      <Header 
        title="Уведомления"
        leftIcon={<ArrowLeft className="w-6 h-6" />}
        onLeftClick={() => setCurrentScreen('home')}
        rightIcon={notifications.some(n => !n.read) ? <CheckCircle className="w-6 h-6" /> : null}
        onRightClick={markAllAsRead}
      />
      
      <div className="p-4 space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Нет уведомлений</p>
          </div>
        ) : (
          notifications.map(notification => {
            const IconComponent = getNotificationIcon(notification.type);
            return (
              <Card 
                key={notification.id}
                className={`cursor-pointer ${!notification.read ? 'bg-red-50 border-red-100' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                      </div>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

// Bottom Navigation
const BottomNavigation = () => {
  const { currentScreen, setCurrentScreen, notifications } = useApp();
  
  const navItems = [
    { id: 'home', icon: Home, label: 'Главная' },
    { id: 'schedule', icon: Calendar, label: 'Расписание' },
    { id: 'progress', icon: Trophy, label: 'Прогресс' },
    { id: 'shop', icon: ShoppingBag, label: 'Магазин' },
    { id: 'profile', icon: User, label: 'Профиль' }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <div className="flex items-center justify-around py-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              currentScreen === item.id 
                ? 'text-red-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="relative">
              <item.icon className="w-6 h-6" />
              {item.id === 'profile' && unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Main App Component
const AIGAConnectApp = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home': return <HomeScreen />;
      case 'schedule': return <ScheduleScreen />;
      case 'progress': return <ProgressScreen />;
      case 'shop': return <ShopScreen />;
      case 'cart': return <CartScreen />;
      case 'checkout': return <CheckoutScreen />;
      case 'profile': return <ProfileScreen />;
      case 'settings': return <SettingsScreen />;
      case 'payment-methods': return <PaymentMethodsScreen />;
      case 'help': return <HelpScreen />;
      case 'notifications': return <NotificationsScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {renderScreen()}
      <BottomNavigation />
    </div>
  );
};

// App with Provider
const App = () => (
  <AppProvider>
    <AIGAConnectApp />
  </AppProvider>
);

export default App;
