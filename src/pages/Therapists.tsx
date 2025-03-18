
import React from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Therapist {
  id: number;
  name: string;
  specialty: string;
  rating: number;
}

const Therapists = () => {
  const therapists: Therapist[] = [
    { id: 1, name: 'Dr. Emily Johnson', specialty: 'Anxiety', rating: 4.8 },
    { id: 2, name: 'Dr. Michael Lee', specialty: 'Depression', rating: 4.7 },
    { id: 3, name: 'Dr. Sarah Thompson', specialty: 'PTSD', rating: 4.9 },
    { id: 4, name: 'Dr. David Wilson', specialty: 'Relationships', rating: 4.6 },
  ];
  
  return (
    <div className="page-container">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-semibold">Therapist Directory</h1>
      </div>
      
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search therapists" 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <select className="border border-gray-300 rounded-lg px-3 py-2">
          <option>All Specialties</option>
          <option>Anxiety</option>
          <option>Depression</option>
          <option>PTSD</option>
          <option>Relationships</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {therapists.map(therapist => (
          <div key={therapist.id} className="border-b border-gray-200 pb-4">
            <h3 className="font-medium">{therapist.name}</h3>
            <p className="text-sm text-blue-500">Specialty: {therapist.specialty}</p>
            <p className="text-sm text-gray-600">Rating: {therapist.rating}/5</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Therapists;
