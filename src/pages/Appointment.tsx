
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, Clock, User, MapPin, Video, Phone } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { format } from 'date-fns';

// Mock data for therapists
const therapistData = [
  { id: 1, name: 'Dr. Emily Johnson', specialty: 'Anxiety', location: 'San Francisco' },
  { id: 2, name: 'Dr. Michael Lee', specialty: 'Depression', location: 'New York' },
  { id: 3, name: 'Dr. Sarah Thompson', specialty: 'PTSD', location: 'Chicago' },
  { id: 4, name: 'Dr. David Wilson', specialty: 'Relationships', location: 'Boston' },
];

const Appointment = () => {
  const [searchParams] = useSearchParams();
  const therapistId = searchParams.get('therapist');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState<'video' | 'phone' | 'in-person'>('video');
  const [currentTherapist, setCurrentTherapist] = useState<typeof therapistData[0] | null>(null);
  
  useEffect(() => {
    if (therapistId) {
      const therapist = therapistData.find(t => t.id === parseInt(therapistId));
      if (therapist) {
        setCurrentTherapist(therapist);
      }
    }
  }, [therapistId]);

  // Generate next 7 available dates
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) { // Skip weekends
        dates.push({
          date: format(date, 'yyyy-MM-dd'),
          displayDate: format(date, 'EEE, MMM d'),
          dayName: format(date, 'EEEE')
        });
      }
      if (dates.length >= 7) break;
    }
    
    return dates;
  };
  
  // Generate time slots
  const getTimeSlots = () => {
    return [
      '09:00 AM', '10:00 AM', '11:00 AM', 
      '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
    ];
  };
  
  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      toast({
        title: "Appointment Booked",
        description: `Your ${appointmentType} appointment has been scheduled for ${selectedDate} at ${selectedTime}`,
        duration: 3000,
      });
      setTimeout(() => navigate('/'), 1500);
    } else {
      toast({
        title: "Error",
        description: "Please select both date and time",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  return (
    <div className="page-container pb-32">
      <div className="flex items-center mb-6 mt-4">
        <button
          className="mr-2 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={22} className="text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-2xl font-semibold">Book an Appointment</h1>
      </div>
      
      {currentTherapist && (
        <Card className="mb-6 bg-mood-purple/50 dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-icon-purple/30 dark:bg-icon-purple/20 flex items-center justify-center text-xl">
                <User className="text-icon-purple" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium">{currentTherapist.name}</h3>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span>{currentTherapist.specialty}</span>
                  <span className="mx-1">•</span>
                  <div className="flex items-center">
                    <MapPin size={12} className="mr-1" />
                    {currentTherapist.location}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Appointment Type</h2>
        <Tabs defaultValue="video" className="w-full" onValueChange={(value) => setAppointmentType(value as any)}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="video" className="flex flex-col h-auto py-3">
              <Video size={16} className="mb-1" />
              <span className="text-xs">Video</span>
            </TabsTrigger>
            <TabsTrigger value="phone" className="flex flex-col h-auto py-3">
              <Phone size={16} className="mb-1" />
              <span className="text-xs">Phone</span>
            </TabsTrigger>
            <TabsTrigger value="in-person" className="flex flex-col h-auto py-3">
              <MapPin size={16} className="mb-1" />
              <span className="text-xs">In-person</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium">Select Date</h2>
          <CalendarIcon size={18} className="text-gray-600 dark:text-gray-400" />
        </div>
        
        <div className="flex overflow-x-auto pb-2 -mx-2 px-2 space-x-2 scrollbar-none">
          {getAvailableDates().map((date) => (
            <button
              key={date.date}
              className={`flex-shrink-0 flex flex-col items-center rounded-xl px-4 py-3 transition-all ${
                selectedDate === date.date
                  ? 'bg-icon-purple text-white dark:bg-icon-purple-light dark:text-black'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSelectedDate(date.date)}
            >
              <span className="text-xs font-medium">{date.dayName}</span>
              <span className="text-lg font-semibold">{date.displayDate.split(',')[1]}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium">Select Time</h2>
          <Clock size={18} className="text-gray-600 dark:text-gray-400" />
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {getTimeSlots().map((time) => (
            <button
              key={time}
              className={`py-3 rounded-xl transition-all ${
                selectedTime === time
                  ? 'bg-icon-purple text-white dark:bg-icon-purple-light dark:text-black'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      
      <div className="fixed bottom-20 left-0 right-0 px-4 pb-4 bg-gradient-to-t from-background via-background to-transparent pt-6">
        <Button 
          className="w-full bg-icon-purple hover:bg-icon-purple/90 dark:bg-icon-purple-light dark:hover:bg-icon-purple-light/90 dark:text-black h-12 rounded-xl transition-all"
          onClick={handleBooking}
          disabled={!selectedDate || !selectedTime}
        >
          Confirm Appointment
        </Button>
      </div>
    </div>
  );
};

export default Appointment;
