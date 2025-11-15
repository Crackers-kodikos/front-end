/**
 * Mock boutiques API for managing boutiques in localStorage
 */

const BOUTIQUES_STORAGE_KEY = 'boutiques';

// Sample boutique data
const SAMPLE_BOUTIQUES = [
  {
    id: 1,
    fullName: "Pure lexuary",
    address: "+213 6 23 45 67 89",
    specialty: "Cotton, Ghila, Melifa",
    ordersCount: "+213 6 23 45 67 89",
    dateStarted: "21-03-1990",
    image: "/src/assets/6b6752ac8194e5ebad81c81e4fc1695cf9c39259.jpg",
    owner: {
      fullName: "Ahmed Benali",
      phone1: "+213 6 23 45 67 89",
      phone2: "+213 6 23 45 67 89",
      birthDate: "21-03-1990",
      city: "Sidi Bel Abbes, Algeria"
    }
  },
  {
    id: 2,
    fullName: "Elegant Atelier",
    address: "+213 7 55 88 99 12",
    specialty: "Silk, Broderie, Traditional",
    ordersCount: "+213 7 55 88 99 12",
    dateStarted: "15-06-1995",
    image: "/src/assets/6b6752ac8194e5ebad81c81e4fc1695cf9c39259.jpg",
    owner: {
      fullName: "Fatima Zerrouki",
      phone1: "+213 7 55 88 99 12",
      phone2: "+213 7 55 88 99 12", 
      birthDate: "15-06-1995",
      city: "Constantine, Algeria"
    }
  },
  {
    id: 3,
    fullName: "Modern Couture",
    address: "+213 5 44 77 33 21",
    specialty: "Modern, Fusion, Karakou",
    ordersCount: "+213 5 44 77 33 21",
    dateStarted: "10-09-2000",
    image: "/src/assets/6b6752ac8194e5ebad81c81e4fc1695cf9c39259.jpg",
    owner: {
      fullName: "Omar Hadjadj",
      phone1: "+213 5 44 77 33 21",
      phone2: "+213 5 44 77 33 21",
      birthDate: "10-09-2000", 
      city: "Oran, Algeria"
    }
  }
];

const getBoutiques = () => {
  try {
    const stored = localStorage.getItem(BOUTIQUES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : SAMPLE_BOUTIQUES;
  } catch (error) {
    console.error('Error reading boutiques from localStorage:', error);
    return SAMPLE_BOUTIQUES;
  }
};

const setBoutiques = (boutiques) => {
  try {
    localStorage.setItem(BOUTIQUES_STORAGE_KEY, JSON.stringify(boutiques));
  } catch (error) {
    console.error('Error saving boutiques to localStorage:', error);
  }
};

export const listBoutiques = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return getBoutiques();
};

export const getBoutique = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const boutiques = getBoutiques();
  return boutiques.find(b => b.id === parseInt(id));
};

export const createBoutique = async (boutiqueData) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const boutiques = getBoutiques();
  const newBoutique = {
    ...boutiqueData,
    id: Math.max(...boutiques.map(b => b.id), 0) + 1,
    dateStarted: new Date().toLocaleDateString('en-GB').replace(/\//g, '-')
  };
  const updatedBoutiques = [...boutiques, newBoutique];
  setBoutiques(updatedBoutiques);
  return newBoutique;
};

export const updateBoutique = async (id, boutiqueData) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const boutiques = getBoutiques();
  const updatedBoutiques = boutiques.map(b => 
    b.id === parseInt(id) ? { ...b, ...boutiqueData } : b
  );
  setBoutiques(updatedBoutiques);
  return updatedBoutiques.find(b => b.id === parseInt(id));
};

export const deleteBoutique = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const boutiques = getBoutiques();
  const updatedBoutiques = boutiques.filter(b => b.id !== parseInt(id));
  setBoutiques(updatedBoutiques);
  return true;
};

export default {
  listBoutiques,
  getBoutique,
  createBoutique,
  updateBoutique,
  deleteBoutique
};