import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Home, User, Calendar, Trophy, ShoppingCart, MessageCircle, 
  Settings, Bell, Play, Star, MapPin, Clock, Users, Award,
  ChevronRight, Plus, Filter, Search, Heart, Share2, 
  Camera, Edit, Check, X, Menu, ArrowLeft, Target,
  Zap, Flame, TrendingUp, BookOpen, Video, Medal,
  CreditCard, Globe, Moon, Sun, Download, Upload
} from 'lucide-react';

// Global State Management
const AppContext = createContext();

const mockData = {
  user: {
    id: 1,
    name: "Александр Петров",
    role: "athlete", // athlete, parent, trainer
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    level: 12,
    xp: 2840,
    nextLevelXp: 3000,
    belt: "blue",
    streak: 15,
    phone: "+7 777 123 4567",
    email: "alex@example.com",
    joinDate: "2023-01-15",
    language: "ru",
    theme: "light"
  },
  schedule: [
    {
      id: 1,
      title: "BJJ Gi",
      instructor: "Мастер Али",
      time: "18:00 - 19:30",
      date: "2025-07-25",
      location: "Зал 1",
      spots: 8,
      maxSpots: 15,
      price: 3000,
      level: "Начинающий",
      registered: false
    },
    {
      id: 2,
      title: "No-Gi Grappling",
      instructor: "Тренер Дамир",
      time: "19:45 - 21:00",
      date: "2025-07-25",
      location: "Зал 2",
      spots: 12,
      maxSpots: 12,
      price: 3500,
      level: "Продвинутый",
      registered: true
    },
    {
      id: 3,
      title: "Детское BJJ",
      instructor: "Тренер Айгуль",
      time: "16:00 - 17:00",
      date: "2025-07-26",
      location: "Зал 1",
      spots: 5,
      maxSpots: 10,
      price: 2500,
      level: "Детская",
      registered: false
    }
  ],
  achievements: [
    { id: 1, title: "Первая победа", icon: "🏆", earned: true, date: "2024-03-15" },
    { id: 2, title: "15 дней подряд", icon: "🔥", earned: true, date: "2024-07-20" },
    { id: 3, title: "Синий пояс", icon: "🥋", earned: true, date: "2024-06-10" },
    { id: 4, title: "100 тренировок", icon: "💯", earned: false, progress: 87 },
    { id: 5, title: "Турнир чемпион", icon: "🥇", earned: false, progress: 0 }
  ],
  shop: [
    {
      id: 1,
      name: "AIGA Gi White",
      price: 45000,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=300&h=300&fit=crop",
      category: "gi",
      sizes: ["A1", "A2", "A3", "A4"],
      inStock: true,
      rating: 4.8,
      reviews: 24
    },
    {
      id: 2,
      name: "AIGA Rashguard",
      price: 18000,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      category: "rashguard",
      sizes: ["S", "M", "L", "XL"],
      inStock: true,
      rating: 4.9,
      reviews: 18
    },
    {
      id: 3,
      name: "AIGA Hoodie",
      price: 25000,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop",
      category: "apparel",
      sizes: ["S", "M", "L", "XL"],
      inStock: false,
      rating: 4.7,
      reviews: 12
    }
  ],
  tournaments: [
    {
      id: 1,
      name: "AIGA Open 2025",
      date: "2025-08-15",
      location: "Астана, Дворец Спорта",
      registrationDeadline: "2025-08-01",
      categories: ["Gi", "No-Gi"],
      registered: false,
      price: 15000
    },
    {
      id: 2,
      name: "Kazakhstan Cup",
      date: "2025-09-20",
      location: "Алматы, Балуан Шолак",
      registrationDeadline: "2025-09-05",
      categories: ["Gi", "No-Gi", "Kids"],
      registered: true,
      price: 20000
    }
  ],
  notifications: [
    { id: 1, title: "Тренировка завтра", message: "BJJ Gi в 18:00", time: "2 ч назад", read: false },
    { id: 2, title: "Новый турнир", message: "AIGA Open 2025 - регистрация открыта", time: "1 день назад", read: false },
    { id: 3, title: "Достижение получено", message: "15 дней подряд! 🔥", time: "2 дня назад", read: true }
  ],
  videos: [
    {
      id: 1,
      title: "Основы Guard",
      instructor: "Мастер Али",
      duration: "12:30",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      category: "basic",
      views: 1240,
      liked: false
    },
    {
      id: 2,
      title: "Triangle Choke Setup",
      instructor: "Тренер Дамир",
      duration: "8:45",
      thumbnail: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=300&h=200&fit=crop",
      category: "submissions",
      views: 892,
      liked: true
    }
  ]
};

const AppProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [user, setUser] = useState(null);
  const [schedule, setSchedule] = useState(mockData.schedule);
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState(mockData.notifications);
  const [loading, setLoading] = useState(false);

  const addToCart = (item, size) => {
    setCart(prev => [...prev, { ...item, size, quantity: 1, id: Date.now() }]);
  };

  const registerForClass = (classId) => {
    setSchedule(prev => prev.map(cls => 
      cls.id === classId ? { ...cls, registered: true, spots: cls.spots + 1 } : cls
    ));
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const contextValue = {
    currentScreen, setCurrentScreen,
    user, setUser,
    schedule, setSchedule,
    cart, setCart, addToCart,
    notifications, setNotifications, markNotificationRead,
    registerForClass,
    loading, setLoading
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Onboarding Screen
const OnboardingScreen = () => {
  const { setCurrentScreen, setUser } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedRole, setSelectedRole] = useState('');

  const slides = [
    {
      title: "Добро пожаловать в AIGA Connect",
      subtitle: "Твоя цифровая академия грэпплинга",
      image: "🥋",
      color: "from-red-500 to-red-600"
    },
    {
      title: "Тренируйся с лучшими",
      subtitle: "Записывайся на тренировки, отслеживай прогресс",
      image: "💪",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Достигай новых высот",
      subtitle: "Участвуй в турнирах, получай достижения",
      image: "🏆",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const roles = [
    { id: 'athlete', name: 'Спортсмен', icon: '🥋', desc: 'Тренируюсь и участвую в соревнованиях' },
    { id: 'parent', name: 'Родитель', icon: '👨‍👩‍👧‍👦', desc: 'Слежу за прогрессом ребенка' },
    { id: 'trainer', name: 'Тренер', icon: '👨‍🏫', desc: 'Провожу тренировки и обучаю' }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setUser({ ...mockData.user, role });
    setCurrentScreen('home');
  };

  if (currentSlide < 3) {
    const slide = slides[currentSlide];
    return (
      <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"></div>
        
        {/* Skip button */}
        <div className="absolute top-6 right-6 z-10">
          <button 
            onClick={() => setCurrentSlide(3)}
            className="text-white/70 text-sm font-medium"
          >
            Пропустить
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${slide.color} flex items-center justify-center text-6xl mb-8 shadow-2xl`}>
            {slide.image}
          </div>
          
          <h1 className="text-3xl font-bold mb-4 leading-tight">
            {slide.title}
          </h1>
          
          <p className="text-xl text-white/80 mb-12 leading-relaxed">
            {slide.subtitle}
          </p>

          {/* Dots indicator */}
          <div className="flex space-x-2 mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-8">
          <button
            onClick={() => setCurrentSlide(currentSlide + 1)}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-200 transform active:scale-95 shadow-xl"
          >
            {currentSlide === 2 ? 'Начать' : 'Далее'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-2 text-center">Выберите роль</h1>
        <p className="text-white/70 text-center mb-12">Это поможет настроить приложение под вас</p>
        
        <div className="space-y-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-6 text-left transition-all duration-200 transform active:scale-95"
            >
              <div className="flex items-center">
                <div className="text-4xl mr-4">{role.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{role.name}</h3>
                  <p className="text-white/70 text-sm">{role.desc}</p>
                </div>
                <ChevronRight className="ml-auto text-white/50" size={20} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Home Screen
const HomeScreen = () => {
  const { user, schedule, notifications } = useApp();
  const unreadNotifications = notifications.filter(n => !n.read).length;
  const todayClasses = schedule.filter(cls => cls.date === '2025-07-25');
  const registeredClasses = schedule.filter(cls => cls.registered);

  const stats = [
    { label: 'Уровень', value: user?.level || 0, icon: Target, color: 'text-blue-500' },
    { label: 'Стрик', value: `${user?.streak || 0} дней`, icon: Flame, color: 'text-orange-500' },
    { label: 'XP', value: `${user?.xp || 0}/${user?.nextLevelXp || 0}`, icon: Zap, color: 'text-yellow-500' }
  ];

  const quickActions = [
    { label: 'Записаться', icon: Plus, action: () => {}, color: 'bg-red-500' },
    { label: 'Расписание', icon: Calendar, action: () => {}, color: 'bg-blue-500' },
    { label: 'Progress', icon: TrendingUp, action: () => {}, color: 'bg-green-500' },
    { label: 'Магазин', icon: ShoppingCart, action: () => {}, color: 'bg-purple-500' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img 
              src={user?.avatar} 
              alt="Avatar"
              className="w-12 h-12 rounded-full border-2 border-white/30 mr-3"
            />
            <div>
              <h1 className="text-lg font-semibold">Привет, {user?.name?.split(' ')[0]}!</h1>
              <p className="text-white/80 text-sm">Готов к тренировке?</p>
            </div>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6" />
            {unreadNotifications > 0 && (
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadNotifications}
              </div>
            )}
          </div>
        </div>

        {/* XP Progress */}
        <div className="bg-white/20 rounded-2xl p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Уровень {user?.level}</span>
            <span className="text-sm">{user?.xp}/{user?.nextLevelXp} XP</span>
          </div>
          <div className="bg-white/20 rounded-full h-3">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${((user?.xp || 0) / (user?.nextLevelXp || 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/20 rounded-xl p-3 text-center">
              <stat.icon className={`w-6 h-6 mx-auto mb-1 ${stat.color}`} />
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-xs text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Быстрые действия</h2>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`${action.color} text-white p-4 rounded-2xl text-center transition-transform active:scale-95`}
            >
              <action.icon className="w-6 h-6 mx-auto mb-2" />
              <span className="text-xs font-medium">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Today's Classes */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Сегодня</h2>
          {todayClasses.length > 0 ? (
            <div className="space-y-3">
              {todayClasses.map((cls) => (
                <div key={cls.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{cls.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      cls.registered ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {cls.registered ? 'Записан' : 'Свободно'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {cls.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {cls.location} • {cls.instructor}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>Сегодня тренировок нет</p>
            </div>
          )}
        </div>

        {/* Recent Achievements */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Последние достижения</h2>
          <div className="grid grid-cols-2 gap-4">
            {mockData.achievements.filter(a => a.earned).slice(0, 4).map((achievement) => (
              <div key={achievement.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-100">
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{achievement.title}</h3>
                <p className="text-xs text-gray-600">{achievement.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Schedule Screen
const ScheduleScreen = () => {
  const { schedule, registerForClass, loading, setLoading } = useApp();
  const [selectedDate, setSelectedDate] = useState('2025-07-25');
  const [filter, setFilter] = useState('all');

  const dates = [
    { date: '2025-07-25', day: 'Пт', dayNum: '25' },
    { date: '2025-07-26', day: 'Сб', dayNum: '26' },
    { date: '2025-07-27', day: 'Вс', dayNum: '27' },
    { date: '2025-07-28', day: 'Пн', dayNum: '28' },
    { date: '2025-07-29', day: 'Вт', dayNum: '29' }
  ];

  const filteredClasses = schedule.filter(cls => {
    if (filter === 'registered') return cls.registered;
    if (filter === 'available') return !cls.registered && cls.spots < cls.maxSpots;
    return cls.date === selectedDate;
  });

  const handleRegister = async (classId) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    registerForClass(classId);
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Расписание</h1>
        
        {/* Date Selector */}
        <div className="flex space-x-3 mb-4">
          {dates.map((dateItem) => (
            <button
              key={dateItem.date}
              onClick={() => setSelectedDate(dateItem.date)}
              className={`flex-1 py-3 rounded-xl text-center transition-all ${
                selectedDate === dateItem.date
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="text-xs font-medium">{dateItem.day}</div>
              <div className="text-lg font-bold">{dateItem.dayNum}</div>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'Все' },
            { key: 'registered', label: 'Записан' },
            { key: 'available', label: 'Доступно' }
          ].map((filterItem) => (
            <button
              key={filterItem.key}
              onClick={() => setFilter(filterItem.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === filterItem.key
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterItem.label}
            </button>
          ))}
        </div>
      </div>

      {/* Classes List */}
      <div className="px-6 py-6">
        {filteredClasses.length > 0 ? (
          <div className="space-y-4">
            {filteredClasses.map((cls) => (
              <div key={cls.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{cls.title}</h3>
                    <p className="text-gray-600 mb-2">{cls.instructor}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 space-x-4 mb-3">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {cls.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {cls.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {cls.spots}/{cls.maxSpots}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">{cls.price.toLocaleString()} ₸</span>
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                        cls.level === 'Начинающий' ? 'bg-green-100 text-green-600' :
                        cls.level === 'Продвинутый' ? 'bg-blue-100 text-blue-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {cls.level}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex space-x-3">
                  {cls.registered ? (
                    <button className="flex-1 bg-green-100 text-green-600 py-3 rounded-xl font-semibold flex items-center justify-center">
                      <Check className="w-5 h-5 mr-2" />
                      Записан
                    </button>
                  ) : cls.spots >= cls.maxSpots ? (
                    <button className="flex-1 bg-gray-100 text-gray-500 py-3 rounded-xl font-semibold" disabled>
                      Мест нет
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRegister(cls.id)}
                      disabled={loading}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition-all transform active:scale-95 disabled:opacity-50"
                    >
                      {loading ? 'Записываем...' : 'Записаться'}
                    </button>
                  )}
                  
                  <button className="w-12 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Тренировок нет</h3>
            <p className="text-gray-600">На выбранную дату тренировки не запланированы</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Progress Screen
const ProgressScreen = () => {
  const { user } = useApp();
  const achievements = mockData.achievements;
  
  const progressData = [
    { month: 'Янв', trainings: 12, tournaments: 1 },
    { month: 'Фев', trainings: 15, tournaments: 0 },
    { month: 'Мар', trainings: 18, tournaments: 2 },
    { month: 'Апр', trainings: 14, tournaments: 1 },
    { month: 'Май', trainings: 20, tournaments: 1 },
    { month: 'Июн', trainings: 16, tournaments: 2 },
    { month: 'Июл', trainings: 22, tournaments: 1 }
  ];

  const belts = [
    { name: 'Белый', color: 'bg-gray-200', earned: true, date: '2023-01-15' },
    { name: 'Синий', color: 'bg-blue-500', earned: true, date: '2024-06-10' },
    { name: 'Фиолетовый', color: 'bg-purple-500', earned: false, progress: 65 },
    { name: 'Коричневый', color: 'bg-amber-700', earned: false, progress: 0 },
    { name: 'Черный', color: 'bg-black', earned: false, progress: 0 }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <h1 className="text-2xl font-bold mb-6">Мой прогресс</h1>
        
        {/* Current Belt */}
        <div className="bg-white/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Синий пояс</h2>
              <p className="text-white/80">Получен 10 июня 2024</p>
            </div>
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>До фиолетового пояса</span>
              <span>65%</span>
            </div>
            <div className="bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2 w-[65%] transition-all duration-1000" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{user?.streak}</div>
            <div className="text-sm text-white/80">Дней подряд</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">87</div>
            <div className="text-sm text-white/80">Тренировок</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-white/80">Турниров</div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Activity Chart */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Активность по месяцам</h3>
          <div className="flex items-end justify-between h-32 space-x-2">
            {progressData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="flex flex-col items-center space-y-1 mb-2">
                  <div 
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${(data.trainings / 25) * 80}px` }}
                  />
                  {data.tournaments > 0 && (
                    <div 
                      className="w-full bg-red-500 rounded-t"
                      style={{ height: `${(data.tournaments / 3) * 20}px` }}
                    />
                  )}
                </div>
                <span className="text-xs text-gray-600">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2" />
              <span className="text-gray-600">Тренировки</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded mr-2" />
              <span className="text-gray-600">Турниры</span>
            </div>
          </div>
        </div>

        {/* Belt Progress */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Пояса</h3>
          <div className="space-y-4">
            {belts.map((belt, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-12 h-8 ${belt.color} rounded mr-4 flex items-center justify-center`}>
                  {belt.earned && <Check className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-900">{belt.name}</span>
                    {belt.earned ? (
                      <span className="text-sm text-gray-500">{belt.date}</span>
                    ) : (
                      <span className="text-sm text-gray-500">{belt.progress || 0}%</span>
                    )}
                  </div>
                  {!belt.earned && (
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 rounded-full h-2 transition-all duration-500"
                        style={{ width: `${belt.progress || 0}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Достижения</h3>
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`rounded-xl p-4 ${
                  achievement.earned 
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200' 
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{achievement.title}</h4>
                {achievement.earned ? (
                  <p className="text-xs text-gray-600">{achievement.date}</p>
                ) : (
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">{achievement.progress || 0}%</p>
                    <div className="bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-orange-400 rounded-full h-1 transition-all duration-500"
                        style={{ width: `${achievement.progress || 0}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Shop Screen
const ShopScreen = () => {
  const { cart, addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { key: 'all', label: 'Все', icon: '🛍️' },
    { key: 'gi', label: 'Кимоно', icon: '🥋' },
    { key: 'rashguard', label: 'Рашгарды', icon: '👕' },
    { key: 'apparel', label: 'Одежда', icon: '👔' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? mockData.shop 
    : mockData.shop.filter(p => p.category === selectedCategory);

  const ProductModal = ({ product, onClose }) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
      if (selectedSize) {
        addToCart(product, selectedSize);
        onClose();
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
        <div className="bg-white w-full max-h-[90vh] rounded-t-3xl p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover rounded-2xl mb-6"
          />

          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold">{product.price.toLocaleString()} ₸</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Размер</h3>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 border rounded-xl font-medium ${
                    selectedSize === size
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-gray-200 text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3">Количество</h3>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white py-4 rounded-2xl font-semibold text-lg transition-all transform active:scale-95"
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Магазин</h1>
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-600" />
            {cart.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Поиск товаров..."
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === category.key
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Нет в наличии</span>
                  </div>
                )}
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    {product.price.toLocaleString()} ₸
                  </span>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    disabled={!product.inStock}
                    className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all transform active:scale-95"
                  >
                    Купить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

// Tournaments Screen
const TournamentsScreen = () => {
  const tournaments = mockData.tournaments;
  const [selectedTournament, setSelectedTournament] = useState(null);

  const TournamentModal = ({ tournament, onClose }) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
        <div className="bg-white w-full max-h-[90vh] rounded-t-3xl p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{tournament.name}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-3" />
              <span>{tournament.date}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-3" />
              <span>{tournament.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-3" />
              <span>Регистрация до {tournament.registrationDeadline}</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Категории</h3>
            <div className="space-y-2">
              {tournament.categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full p-3 border rounded-xl text-left ${
                    selectedCategory === category
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-gray-200 text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Стоимость участия:</span>
                <span className="text-xl font-bold">{tournament.price.toLocaleString()} ₸</span>
              </div>
            </div>
          </div>

          <button
            disabled={!selectedCategory || tournament.registered}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white py-4 rounded-2xl font-semibold text-lg transition-all transform active:scale-95"
          >
            {tournament.registered ? 'Уже зарегистрирован' : 'Зарегистрироваться'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <h1 className="text-2xl font-bold mb-4">Турниры</h1>
        <p className="text-white/80">Участвуй в соревнованиях и побеждай</p>
      </div>

      <div className="px-6 py-6">
        {/* Upcoming Tournaments */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ближайшие турниры</h2>
          {tournaments.map((tournament) => (
            <div key={tournament.id} className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tournament.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {tournament.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {tournament.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      Регистрация до {tournament.registrationDeadline}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tournament.categories.map((category) => (
                      <span 
                        key={category}
                        className="px-3 py-1 bg-purple-100 text-purple-600 text-sm rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      {tournament.price.toLocaleString()} ₸
                    </span>
                    <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                      tournament.registered 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tournament.registered ? 'Зарегистрирован' : 'Доступно'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedTournament(tournament)}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold transition-all transform active:scale-95"
              >
                Подробнее
              </button>
            </div>
          ))}
        </div>

        {/* Past Results */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Прошедшие турниры</h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">Spring Open 2024</h3>
                <p className="text-sm text-gray-600">15 мая 2024</p>
              </div>
              <div className="text-right">
                <div className="text-2xl">🥈</div>
                <p className="text-sm text-gray-600">2 место</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Категория:</span>
                <span className="font-medium">Gi, Синий пояс</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedTournament && (
        <TournamentModal 
          tournament={selectedTournament} 
          onClose={() => setSelectedTournament(null)} 
        />
      )}
    </div>
  );
};

// Profile Screen
const ProfileScreen = () => {
  const { user, setUser, setCurrentScreen } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user || {});

  const handleSave = () => {
    setUser(editData);
    setIsEditing(false);
  };

  const toggleTheme = () => {
    const newTheme = user.theme === 'light' ? 'dark' : 'light';
    setUser({ ...user, theme: newTheme });
  };

  const menuItems = [
    { label: 'Настройки', icon: Settings, action: () => {} },
    { label: 'Уведомления', icon: Bell, action: () => {} },
    { label: 'Способы оплаты', icon: CreditCard, action: () => {} },
    { label: 'Язык', icon: Globe, action: () => {} },
    { label: 'Тема', icon: user?.theme === 'light' ? Sun : Moon, action: toggleTheme },
    { label: 'Помощь', icon: MessageCircle, action: () => {} }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Профиль</h1>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 bg-white/20 rounded-full"
          >
            {isEditing ? <Check className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex items-center mb-6">
          <div className="relative">
            <img 
              src={user?.avatar} 
              alt="Avatar"
              className="w-20 h-20 rounded-full border-4 border-white/30"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
          
          <div className="ml-4 flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/70 w-full"
                  placeholder="Имя"
                />
                <input
                  value={editData.phone}
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                  className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/70 w-full"
                  placeholder="Телефон"
                />
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-white/80">{user?.phone}</p>
                <p className="text-sm text-white/60">Член с {user?.joinDate}</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <div className="text-lg font-bold">{user?.level}</div>
            <div className="text-xs text-white/80">Уровень</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <div className="text-lg font-bold">{user?.streak}</div>
            <div className="text-xs text-white/80">Дней подряд</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <div className="text-lg font-bold">{user?.belt}</div>
            <div className="text-xs text-white/80">Пояс</div>
          </div>
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition-all transform active:scale-95"
          >
            Сохранить изменения
          </button>
        )}
      </div>

      <div className="px-6 py-6">
        {/* Menu Items */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center">
                <item.icon className="w-5 h-5 text-gray-600 mr-3" />
                <span className="text-gray-900 font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={() => setCurrentScreen('onboarding')}
          className="w-full mt-6 bg-red-100 text-red-600 py-4 rounded-2xl font-semibold transition-all transform active:scale-95"
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
};

// Videos Screen
const VideosScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [likedVideos, setLikedVideos] = useState(new Set([2]));

  const categories = [
    { key: 'all', label: 'Все' },
    { key: 'basic', label: 'Основы' },
    { key: 'submissions', label: 'Приемы' },
    { key: 'guard', label: 'Гард' },
    { key: 'takedowns', label: 'Броски' }
  ];

  const toggleLike = (videoId) => {
    setLikedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const filteredVideos = selectedCategory === 'all' 
    ? mockData.videos 
    : mockData.videos.filter(v => v.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 pt-12 pb-6 rounded-b-[2rem]">
        <h1 className="text-2xl font-bold mb-4">Видео уроки</h1>
        <p className="text-white/80">Изучай технику с лучшими тренерами</p>
      </div>

      <div className="px-6 py-6">
        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto mb-6">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === category.key
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Videos List */}
        <div className="space-y-4">
          {filteredVideos.map((video) => (
            <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-gray-900 ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{video.instructor}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {video.views.toLocaleString()} просмотров
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleLike(video.id)}
                      className={`p-2 rounded-full transition-colors ${
                        likedVideos.has(video.id)
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedVideos.has(video.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Notifications Screen
const NotificationsScreen = () => {
  const { notifications, markNotificationRead } = useApp();

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markNotificationRead(notification.id);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Уведомления</h1>
      </div>

      <div className="px-6 py-6">
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`w-full text-left p-4 rounded-2xl transition-all ${
                  notification.read 
                    ? 'bg-white border border-gray-100' 
                    : 'bg-blue-50 border border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className={`font-semibold ${notification.read ? 'text-gray-900' : 'text-blue-900'}`}>
                      {notification.title}
                    </h3>
                    <p className={`text-sm mt-1 ${notification.read ? 'text-gray-600' : 'text-blue-700'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full ml-3 mt-2" />
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Нет уведомлений</h3>
            <p className="text-gray-600">Все уведомления появятся здесь</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Settings Screen
const SettingsScreen = () => {
  const { user, setUser } = useApp();
  const [language, setLanguage] = useState(user?.language || 'ru');
  const [notifications, setNotifications] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);

  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'kz', name: 'Қазақша', flag: '🇰🇿' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const Toggle = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-red-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Настройки</h1>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Language Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Язык приложения</h2>
          <div className="space-y-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setUser({ ...user, language: lang.code });
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                  language === lang.code
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{lang.flag}</span>
                  <span className="font-medium text-gray-900">{lang.name}</span>
                </div>
                {language === lang.code && (
                  <Check className="w-5 h-5 text-red-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Уведомления</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Push-уведомления</h3>
                <p className="text-sm text-gray-600">Получать уведомления о тренировках</p>
              </div>
              <Toggle enabled={notifications} onToggle={() => setNotifications(!notifications)} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Email-уведомления</h3>
                <p className="text-sm text-gray-600">Получать письма о турнирах</p>
              </div>
              <Toggle enabled={true} onToggle={() => {}} />
            </div>
          </div>
        </div>

        {/* App Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Приложение</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Автообновление</h3>
                <p className="text-sm text-gray-600">Обновлять приложение автоматически</p>
              </div>
              <Toggle enabled={autoUpdate} onToggle={() => setAutoUpdate(!autoUpdate)} />
            </div>

            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <Download className="w-5 h-5 text-gray-600 mr-3" />
                <span className="font-medium text-gray-900">Очистить кэш</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">О приложении</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Версия</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Сборка</span>
              <span className="font-medium">2025.07.25</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Bottom Navigation
const BottomNavigation = () => {
  const { currentScreen, setCurrentScreen, notifications } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { key: 'home', label: 'Главная', icon: Home },
    { key: 'schedule', label: 'Расписание', icon: Calendar },
    { key: 'progress', label: 'Прогресс', icon: Trophy },
    { key: 'shop', label: 'Магазин', icon: ShoppingCart },
    { key: 'profile', label: 'Профиль', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-40">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setCurrentScreen(item.key)}
            className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all ${
              currentScreen === item.key
                ? 'bg-red-50 text-red-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="relative">
              <item.icon className="w-5 h-5" />
              {item.key === 'profile' && unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              )}
            </div>
            <span className="text-xs font-medium mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Main App Component
const Ap = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen />;
      case 'home':
        return <HomeScreen />;
      case 'schedule':
        return <ScheduleScreen />;
      case 'progress':
        return <ProgressScreen />;
      case 'shop':
        return <ShopScreen />;
      case 'tournaments':
        return <TournamentsScreen />;
      case 'videos':
        return <VideosScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
      {renderScreen()}
      {currentScreen !== 'onboarding' && <BottomNavigation />}
    </div>
  );
};

// Root Component
const App = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default App;