
import React, { useState } from 'react';
import { ArrowLeft, Search, Star, MapPin, Users, Clock, Filter, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Therapist {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  location: string;
  image?: string;
  availability: string;
  patients: number;
  verified?: boolean;
}

const Therapists = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const navigate = useNavigate();
  
  const therapists: Therapist[] = [
    { 
      id: 1, 
      name: 'Dr. Emily Johnson', 
      specialty: 'Anxiety', 
      rating: 4.8, 
      location: 'San Francisco',
      availability: 'Next available: Tomorrow',
      patients: 120,
      verified: true
    },
    { 
      id: 2, 
      name: 'Dr. Michael Lee', 
      specialty: 'Depression', 
      rating: 4.7, 
      location: 'New York',
      availability: 'Next available: Wednesday',
      patients: 98,
      verified: true
    },
    { 
      id: 3, 
      name: 'Dr. Sarah Thompson', 
      specialty: 'PTSD', 
      rating: 4.9, 
      location: 'Chicago',
      availability: 'Next available: Today',
      patients: 145,
      verified: true
    },
    { 
      id: 4, 
      name: 'Dr. David Wilson', 
      specialty: 'Relationships', 
      rating: 4.6, 
      location: 'Boston',
      availability: 'Next available: Friday',
      patients: 87
    },
  ];
  
  const specialties = ['Anxiety', 'Depression', 'PTSD', 'Relationships', 'Trauma', 'Stress'];
  
  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         therapist.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty ? therapist.specialty === selectedSpecialty : true;
    
    return matchesSearch && matchesSpecialty;
  });
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} size={14} className="text-yellow-400" />);
      } else {
        stars.push(<Star key={i} size={14} className="text-gray-300 dark:text-gray-600" />);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };
  
  return (
    <div className="page-container">
      <div className="flex items-center mb-6 mt-4">
        <button 
          className="mr-4 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-2xl font-semibold">Find a Therapist</h1>
      </div>
      
      <div className="flex flex-col gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="text" 
            placeholder="Search by name or specialty" 
            className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="flex-1 bg-white dark:bg-gray-800">
              <SelectValue placeholder="All Specialties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Specialties</SelectItem>
              {specialties.map(specialty => (
                <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon" className="aspect-square bg-white dark:bg-gray-800">
            <Filter size={18} />
          </Button>
        </div>
      </div>
      
      <div className="space-y-4 animate-fade-in">
        {filteredTherapists.length > 0 ? (
          filteredTherapists.map(therapist => (
            <Card key={therapist.id} className="overflow-hidden transition-all hover:shadow-md hover:translate-y-[-2px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-icon-purple/20 dark:bg-icon-purple/40 flex items-center justify-center text-xl mr-3">
                        {therapist.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-lg">{therapist.name}</h3>
                          {therapist.verified && (
                            <ShieldCheck size={16} className="ml-1 text-green-500" />
                          )}
                        </div>
                        <Badge className="mt-1 bg-mood-purple text-icon-purple dark:bg-gray-700 dark:text-icon-purple-light border-0">
                          {therapist.specialty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <div className="flex items-center">
                      {renderStars(therapist.rating)}
                      <span className="ml-1">{therapist.rating}</span>
                    </div>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {therapist.location}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4 mt-2">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {therapist.availability}
                    </div>
                    <div className="flex items-center">
                      <Users size={14} className="mr-1" />
                      {therapist.patients} patients
                    </div>
                  </div>
                </div>
                
                <div className="flex border-t border-gray-100 dark:border-gray-700">
                  <Link 
                    to={`/appointment?therapist=${therapist.id}`} 
                    className="flex-1 py-3 text-center text-icon-purple dark:text-icon-purple-light font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Book Appointment
                  </Link>
                  <Link 
                    to={`/therapists/${therapist.id}`} 
                    className="flex-1 py-3 text-center text-gray-600 dark:text-gray-400 border-l border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="text-gray-400 mb-2">
              <Search size={40} />
            </div>
            <h3 className="text-lg font-medium mb-1">No therapists found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Therapists;
