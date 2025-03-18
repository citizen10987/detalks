
import React, { useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Appointment = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const { toast } = useToast();
  
  const handleBooking = () => {
    if (date && time) {
      toast({
        title: "Appointment Booked",
        description: `Your appointment has been scheduled for ${date} at ${time}`,
        duration: 3000,
      });
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
    <div className="page-container">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-semibold">Book an Appointment</h1>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Select Date</label>
          <div className="relative">
            <input 
              type="date" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
              placeholder="dd-mm-yyyy"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Select Time</label>
          <select 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="">Choose a time</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="01:00 PM">01:00 PM</option>
            <option value="02:00 PM">02:00 PM</option>
            <option value="03:00 PM">03:00 PM</option>
          </select>
        </div>
        
        <button 
          className="w-full bg-mood-peach text-white py-3 rounded-lg font-medium"
          onClick={handleBooking}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Appointment;
