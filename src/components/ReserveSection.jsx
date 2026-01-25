import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Phone, CheckCircle, AlertCircle, Loader2, RefreshCw,
  MapPin, Gift, CreditCard, Calendar, Truck, ChevronDown, Search, Home, Building2,
  Map, X, Navigation, ExternalLink, Banknote, Shield, Mail, MessageCircle,
  FileText, Lock, Eye, Trash2, UserX, ChevronRight, Send
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { products } from '../data/products';
import { getAssetPath, img } from '../utils/assets';
import {
  departments,
  viaTypes,
  propertyTypes,
  getCitiesByDepartment,
  getSortedDepartments
} from '../data/colombiaLocations';

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwTJa6BM6f2a8-Gbk1jS3PxnAfMqyNANgP3YR9f0szlUMrJK0S2090FbjhUDsZqkks8/exec';

// Format currency in Colombian pesos
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Get pasta blanda product info for free gift display
const PASTA_BLANDA_PRODUCT = products.find(p => p.id === 3);
const PASTA_BLANDA_PRICE = PASTA_BLANDA_PRODUCT?.price || 12990;

// Searchable Select Component
const SearchableSelect = ({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  hasError,
  isDark,
  icon: Icon,
  searchable = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const filteredOptions = searchable && searchTerm
    ? options.filter(opt =>
      (typeof opt === 'string' ? opt : opt.name || opt.label)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    : options;

  const displayValue = value
    ? (typeof options[0] === 'string'
      ? value
      : options.find(o => o.id === value || o.value === value)?.name ||
      options.find(o => o.id === value || o.value === value)?.label ||
      value)
    : '';

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current && searchable) {
      inputRef.current.focus();
    }
  }, [isOpen, searchable]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full ${Icon ? 'pl-10 sm:pl-12' : 'pl-3 sm:pl-4'} pr-8 sm:pr-10 py-3 sm:py-3.5 border-2 rounded-xl text-left transition-all duration-200 text-sm sm:text-base
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${isDark
            ? `bg-dark-surface border-dark-border text-dark-text
               ${isOpen ? 'border-maple' : ''}
               ${hasError ? 'border-red-500' : ''}`
            : `bg-white border-warm-tan/50 text-warm-brown
               ${isOpen ? 'border-maple' : ''}
               ${hasError ? 'border-red-400' : ''}`
          }
        `}
      >
        {Icon && (
          <Icon className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none
            ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}
          />
        )}
        <span className={`block truncate ${!displayValue ? (isDark ? 'text-dark-text-subtle' : 'text-warm-gray') : ''}`}>
          {displayValue || placeholder}
        </span>
        <ChevronDown className={`absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-transform duration-200
          ${isOpen ? 'rotate-180' : ''} ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 min-w-[180px] w-max max-w-[280px] mt-2 rounded-xl border-2 shadow-xl overflow-hidden
              ${isDark ? 'bg-dark-bg-card border-dark-border' : 'bg-white border-warm-tan/30'}
            `}
          >
            {searchable && (
              <div className={`p-2 border-b ${isDark ? 'border-dark-border' : 'border-warm-tan/20'}`}>
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4
                    ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar..."
                    className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none
                      ${isDark
                        ? 'bg-dark-surface text-dark-text placeholder-dark-text-subtle'
                        : 'bg-warm-cream-light text-warm-brown placeholder-warm-gray'
                      }
                    `}
                  />
                </div>
              </div>
            )}
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className={`p-3 text-sm text-center ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                  No se encontraron resultados
                </div>
              ) : (
                filteredOptions.map((option, idx) => {
                  const optValue = typeof option === 'string' ? option : (option.id || option.value);
                  const optLabel = typeof option === 'string' ? option : (option.name || option.label);
                  const isSelected = value === optValue;

                  return (
                    <button
                      key={optValue + idx}
                      type="button"
                      onClick={() => {
                        onChange(optValue);
                        setIsOpen(false);
                        setSearchTerm('');
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors
                        ${isSelected
                          ? isDark
                            ? 'bg-maple/20 text-maple'
                            : 'bg-maple/10 text-maple'
                          : isDark
                            ? 'text-dark-text hover:bg-dark-surface'
                            : 'text-warm-brown hover:bg-warm-cream-light'
                        }
                      `}
                    >
                      {optLabel}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Google Geocoding API Key
const GOOGLE_GEOCODING_API_KEY = 'AIzaSyCJalpjrmMFRBMGqUd0SJsLmx77FVzUSfM';

// Helper function to parse Colombian address from Google Geocoding response
const parseGoogleAddress = (result) => {
  const components = result.address_components || [];
  const fullAddress = result.formatted_address || '';

  // Extract components
  let route = '';
  let streetNumber = '';
  let city = '';
  let state = '';

  for (const component of components) {
    const types = component.types || [];
    if (types.includes('route')) {
      route = component.long_name;
    } else if (types.includes('street_number')) {
      streetNumber = component.long_name;
    } else if (types.includes('locality')) {
      city = component.long_name;
    } else if (types.includes('administrative_area_level_1')) {
      state = component.long_name;
    }
  }

  // Parse Colombian address patterns from route
  // e.g., "Carrera 7", "Calle 72", "Avenida 19"
  // Includes all common Colombian abbreviations for each via type
  const viaPatterns = [
    { pattern: /^(Carrera|Cra\.?|Cr\.?|Kr\.?|Kra\.?)\s*(\d+[A-Za-z]?)/i, type: 'Carrera' },
    { pattern: /^(Calle|Cl\.?|Cll\.?)\s*(\d+[A-Za-z]?)/i, type: 'Calle' },
    { pattern: /^(Avenida|Av\.?|Ave\.?|Avenida Calle|Avenida Carrera|Av\s*Calle|Av\s*Carrera)\s*(\d+[A-Za-z]?)/i, type: 'Avenida' },
    { pattern: /^(Diagonal|Dg\.?|Diag\.?)\s*(\d+[A-Za-z]?)/i, type: 'Diagonal' },
    { pattern: /^(Transversal|Tv\.?|Trans\.?|Trv\.?|Tr\.?)\s*(\d+[A-Za-z]?)/i, type: 'Transversal' },
    { pattern: /^(Circular|Circ\.?)\s*(\d+[A-Za-z]?)/i, type: 'Circular' },
  ];

  let viaType = '';
  let viaNumber = '';

  for (const { pattern, type } of viaPatterns) {
    const match = route.match(pattern);
    if (match) {
      viaType = type;
      viaNumber = match[2];
      break;
    }
  }

  // Try to extract cross street info from full address (e.g., "#72-13")
  let cruceNumber = '';
  let placaNumber = '';
  const crossMatch = fullAddress.match(/#\s*(\d+[A-Za-z]?)(?:\s*-\s*(\d+))?/);
  if (crossMatch) {
    cruceNumber = crossMatch[1] || '';
    placaNumber = crossMatch[2] || '';
  }

  return {
    viaType,
    viaNumber,
    cruceNumber,
    placaNumber,
    route,
    streetNumber,
    city,
    state,
    fullAddress
  };
};

// Google Maps Location Picker Modal
const GoogleMapsModal = ({ isOpen, onClose, onSelectAddress, isDark }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 4.6097, lng: -74.0817 }); // Bogotá default
  const [selectedAddress, setSelectedAddress] = useState(null); // Now stores full data
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const inputRef = useRef(null);

  // Auto-fill options
  const [autoFillOptions, setAutoFillOptions] = useState({
    departmentCity: true,
    address: true,
  });

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedAddress(null);
      setSearchQuery('');
      setLocationError('');
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Helper function to call geocoding API with retry
  const geocodeWithRetry = async (url, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        return data;
      }

      // If rate limited or denied, wait and retry
      if (data.status === 'OVER_QUERY_LIMIT' || data.status === 'REQUEST_DENIED') {
        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Wait 1s, 2s, 3s
          continue;
        }
      }

      return data; // Return the error response on last try
    }
  };

  // Get user's current location
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Tu navegador no soporta geolocalización');
      return;
    }

    setIsLoading(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter({ lat: latitude, lng: longitude });

        // Reverse geocode using Google Geocoding API with retry
        try {
          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=es&key=${GOOGLE_GEOCODING_API_KEY}`;
          const data = await geocodeWithRetry(url);
          console.log('Google Geocoding response:', data);

          if (data.status === 'OK' && data.results && data.results.length > 0) {
            const parsed = parseGoogleAddress(data.results[0]);
            setSelectedAddress(parsed);
          } else if (data.status === 'REQUEST_DENIED') {
            console.error('API Error:', data.error_message);
            setLocationError('Error de API. Intenta de nuevo en unos segundos.');
          } else if (data.status === 'OVER_QUERY_LIMIT') {
            setLocationError('Demasiadas solicitudes. Intenta en unos segundos.');
          } else {
            setLocationError(`No pudimos obtener la dirección. (${data.status})`);
          }
        } catch (err) {
          console.error('Geocoding error:', err);
          setLocationError('Error al obtener la dirección. Intenta de nuevo.');
        }

        setIsLoading(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLocationError('No pudimos obtener tu ubicación. Verifica los permisos del navegador.');
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Search for an address using Google Geocoding API
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setLocationError('');

    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchQuery + ', Colombia')}&language=es&key=${GOOGLE_GEOCODING_API_KEY}`;
      const data = await geocodeWithRetry(url);

      if (data.status === 'OK' && data.results && data.results.length > 0) {
        const result = data.results[0];
        const location = result.geometry.location;
        setMapCenter({ lat: location.lat, lng: location.lng });
        const parsed = parseGoogleAddress(result);
        setSelectedAddress(parsed);
      } else if (data.status === 'ZERO_RESULTS') {
        setLocationError('No se encontró la dirección. Intenta con más detalles.');
      } else if (data.status === 'REQUEST_DENIED' || data.status === 'OVER_QUERY_LIMIT') {
        setLocationError('Demasiadas solicitudes. Intenta en unos segundos.');
      } else {
        setLocationError('Error al buscar la dirección. Intenta de nuevo.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setLocationError('Error al buscar la dirección. Intenta de nuevo.');
    }

    setIsLoading(false);
  };

  // Use selected address and close
  const handleUseAddress = () => {
    if (selectedAddress && onSelectAddress) {
      onSelectAddress(selectedAddress, autoFillOptions);
    }
    onClose();
  };

  if (!isOpen) return null;

  // Google Maps embed URL with marker
  const mapEmbedUrl = `https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=17&output=embed`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden
            ${isDark ? 'bg-dark-bg-card' : 'bg-white'}
          `}
        >
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b
            ${isDark ? 'border-dark-border' : 'border-warm-tan/30'}
          `}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${isDark ? 'bg-maple/20' : 'bg-maple/10'}`}>
                <Map className="w-5 h-5 text-maple" />
              </div>
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                  Buscar Dirección
                </h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                  Busca o usa tu ubicación actual
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors
                ${isDark ? 'hover:bg-dark-surface text-gray-400' : 'hover:bg-warm-cream-light text-warm-gray'}
              `}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className={`p-4 border-b ${isDark ? 'border-dark-border' : 'border-warm-tan/30'}`}>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5
                  ${isDark ? 'text-gray-500' : 'text-warm-gray'}
                `} />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ej: Carrera 7 con Calle 72, Bogotá"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-colors
                    ${isDark
                      ? 'bg-dark-surface border-dark-border text-dark-text placeholder-dark-text-subtle focus:border-maple'
                      : 'bg-warm-cream-light border-warm-tan/30 text-warm-brown placeholder-warm-gray focus:border-maple'
                    }
                  `}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                />
              </div>
              <button
                type="button"
                onClick={handleSearch}
                disabled={isLoading || !searchQuery.trim()}
                className="px-4 py-3 rounded-xl font-medium bg-maple text-white hover:bg-maple-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              </button>
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                disabled={isLoading}
                className={`px-4 py-3 rounded-xl font-medium transition-colors
                  ${isDark
                    ? 'bg-dark-surface border-2 border-dark-border text-dark-text hover:border-maple'
                    : 'bg-warm-cream-light border-2 border-warm-tan/30 text-warm-brown hover:border-maple'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
                title="Usar mi ubicación"
              >
                <Navigation className="w-5 h-5" />
              </button>
            </div>

            {locationError && (
              <p className="mt-2 text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {locationError}
              </p>
            )}
          </div>

          {/* Map Container */}
          <div className="relative w-full h-64 sm:h-72">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
              className="w-full h-full"
            />
            {isLoading && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>

          {/* Selected Address */}
          <div className={`p-4 border-t ${isDark ? 'border-dark-border' : 'border-warm-tan/30'}`}>
            {selectedAddress ? (
              <div className="space-y-3">
                <div className={`p-3 rounded-xl ${isDark ? 'bg-dark-surface' : 'bg-warm-cream-light'}`}>
                  <p className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                    Dirección encontrada:
                  </p>
                  <p className={`text-sm ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                    {selectedAddress.fullAddress}
                  </p>
                </div>

                {/* Auto-fill Options */}
                <div className={`p-3 rounded-xl ${isDark ? 'bg-dark-surface' : 'bg-warm-cream-light'}`}>
                  <p className={`text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                    ¿Qué deseas autocompletar?
                  </p>
                  <div className="space-y-2">
                    {/* Department & City Toggle */}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div
                        onClick={() => setAutoFillOptions(prev => ({ ...prev, departmentCity: !prev.departmentCity }))}
                        className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${autoFillOptions.departmentCity
                          ? 'bg-maple'
                          : isDark ? 'bg-dark-border' : 'bg-warm-tan/50'
                          }`}
                      >
                        <div
                          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${autoFillOptions.departmentCity ? 'translate-x-4' : ''
                            }`}
                        />
                      </div>
                      <span className={`text-sm ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                        Departamento y Ciudad
                      </span>
                      {selectedAddress.city && (
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}>
                          ({selectedAddress.city})
                        </span>
                      )}
                    </label>

                    {/* Address Toggle */}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div
                        onClick={() => setAutoFillOptions(prev => ({ ...prev, address: !prev.address }))}
                        className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${autoFillOptions.address
                          ? 'bg-maple'
                          : isDark ? 'bg-dark-border' : 'bg-warm-tan/50'
                          }`}
                      >
                        <div
                          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${autoFillOptions.address ? 'translate-x-4' : ''
                            }`}
                        />
                      </div>
                      <span className={`text-sm ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                        Dirección
                      </span>
                      {selectedAddress.viaType && (
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-warm-gray'}`}>
                          ({selectedAddress.viaType} {selectedAddress.viaNumber}{selectedAddress.cruceNumber ? ` #${selectedAddress.cruceNumber}` : ''})
                        </span>
                      )}
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className={`flex-1 px-4 py-3 rounded-xl font-medium transition-colors
                      ${isDark
                        ? 'bg-dark-surface border-2 border-dark-border text-dark-text hover:border-maple'
                        : 'bg-warm-cream-light border-2 border-warm-tan/30 text-warm-brown hover:border-maple'
                      }
                    `}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleUseAddress}
                    className="flex-1 px-4 py-3 rounded-xl font-medium bg-maple text-white hover:bg-maple-dark transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Usar dirección
                  </button>
                </div>
              </div>
            ) : (
              <p className={`text-sm text-center ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                Busca una dirección o usa el botón de ubicación para encontrar tu dirección
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Privacy Policy Modal - Colombian Law 1581 Compliance - Clean Modern Design
const PrivacyPolicyModal = ({ isOpen, onClose, isDark }) => {
  const [activeTab, setActiveTab] = useState('policy'); // 'policy' or 'rights'
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestForm, setRequestForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dataTypes: [],
    reason: ''
  });

  const dataTypeOptions = [
    { id: 'nombre', label: 'Nombre', icon: User },
    { id: 'whatsapp', label: 'WhatsApp', icon: Phone },
    { id: 'direccion', label: 'Dirección', icon: MapPin },
    { id: 'pedidos', label: 'Historial de pedidos', icon: FileText }
  ];

  // Handle close with reset
  const handleClose = () => {
    setShowRequestForm(false);
    setActiveTab('policy');
    setRequestForm({
      fullName: '',
      email: '',
      phone: '',
      dataTypes: [],
      reason: ''
    });
    onClose();
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleDataType = (typeId) => {
    setRequestForm(prev => ({
      ...prev,
      dataTypes: prev.dataTypes.includes(typeId)
        ? prev.dataTypes.filter(id => id !== typeId)
        : [...prev.dataTypes, typeId]
    }));
  };

  const buildWhatsAppMessage = () => {
    const selectedTypes = requestForm.dataTypes
      .map(id => dataTypeOptions.find(opt => opt.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const message = `SOLICITUD DE ELIMINACIÓN DE DATOS

Información del Solicitante:
- Nombre: ${requestForm.fullName}
- Email: ${requestForm.email}
- Teléfono: ${requestForm.phone}

Datos a Eliminar:
${selectedTypes || 'No especificados'}

Motivo:
${requestForm.reason || 'No especificado'}

Solicitud bajo Ley 1581 de 2012 (Habeas Data)`;

    return encodeURIComponent(message);
  };

  const buildEmailBody = () => {
    const selectedTypes = requestForm.dataTypes
      .map(id => dataTypeOptions.find(opt => opt.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const body = `SOLICITUD DE ELIMINACIÓN DE DATOS PERSONALES

Información del Solicitante:
- Nombre completo: ${requestForm.fullName}
- Correo electrónico: ${requestForm.email}
- Teléfono: ${requestForm.phone}

Datos que solicito eliminar:
${selectedTypes || 'No especificados'}

Motivo de la solicitud:
${requestForm.reason || 'No especificado'}

---
Esta solicitud se realiza en ejercicio de mis derechos bajo la Ley 1581 de 2012 (Ley de Habeas Data de Colombia).

Atentamente,
${requestForm.fullName}`;

    return encodeURIComponent(body);
  };

  const handleWhatsAppClick = () => {
    const message = buildWhatsAppMessage();
    window.open(`https://wa.me/573162115581?text=${message}`, '_blank');
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent('Solicitud de Eliminación de Datos - Ley 1581');
    const body = buildEmailBody();
    const mailtoUrl = `mailto:collect.1.point@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_self');
  };

  const isFormValid = requestForm.fullName && requestForm.email && requestForm.phone && requestForm.dataTypes.length > 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            mass: 0.8,
          }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-md max-h-[85vh] rounded-2xl overflow-hidden
            ${isDark ? 'bg-dark-bg-card shadow-2xl shadow-black/50' : 'bg-white shadow-2xl shadow-black/20'}
          `}
        >
          {/* Header - Clean, no glow */}
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-dark-border' : 'border-gray-100'}`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${isDark ? 'bg-emerald-500/15' : 'bg-emerald-50'}`}>
                <Shield className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Política de Privacidad
                </h3>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  Ley 1581 de 2012 • Colombia
                </p>
              </div>
            </div>
            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-dark-surface text-gray-400' : 'hover:bg-gray-100 text-gray-400'}`}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Tab Navigation */}
          {!showRequestForm && (
            <div className={`flex gap-2 p-3 ${isDark ? 'bg-dark-surface/50' : 'bg-gray-50'}`}>
              {[
                { id: 'policy', label: 'Política', icon: FileText },
                { id: 'rights', label: 'Tus Derechos', icon: Shield }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeTab === tab.id
                      ? 'bg-maple text-white shadow-md'
                      : isDark
                        ? 'text-gray-400 hover:text-white hover:bg-dark-surface'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-white'
                    }
                  `}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              ))}
            </div>
          )}

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[calc(85vh-180px)] p-4">
            <AnimatePresence mode="wait">
              {showRequestForm ? (
                /* Data Deletion Request Form */
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {/* Back button */}
                  <button
                    onClick={() => setShowRequestForm(false)}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors
                      ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}
                    `}
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Volver
                  </button>

                  {/* Form Header */}
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-maple/20' : 'bg-maple/10'}`}>
                      <Trash2 className="w-4 h-4 text-maple" />
                    </div>
                    <div>
                      <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Solicitud de Eliminación
                      </h4>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        Procesaremos tu solicitud en máximo 15 días hábiles.
                      </p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-3">
                    {/* Full Name */}
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        value={requestForm.fullName}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Nombre completo *"
                        className={`w-full pl-10 pr-3 py-2.5 rounded-xl text-sm transition-all
                          ${isDark
                            ? 'bg-dark-surface border border-dark-border text-white placeholder-gray-500 focus:border-maple'
                            : 'bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-maple focus:bg-white'
                          }
                        `}
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input
                        type="email"
                        value={requestForm.email}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Correo electrónico *"
                        className={`w-full pl-10 pr-3 py-2.5 rounded-xl text-sm transition-all
                          ${isDark
                            ? 'bg-dark-surface border border-dark-border text-white placeholder-gray-500 focus:border-maple'
                            : 'bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-maple focus:bg-white'
                          }
                        `}
                      />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      <input
                        type="tel"
                        value={requestForm.phone}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="WhatsApp *"
                        className={`w-full pl-10 pr-3 py-2.5 rounded-xl text-sm transition-all
                          ${isDark
                            ? 'bg-dark-surface border border-dark-border text-white placeholder-gray-500 focus:border-maple'
                            : 'bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-maple focus:bg-white'
                          }
                        `}
                      />
                    </div>

                    {/* Data Types Selection - 2 per row */}
                    <div>
                      <p className={`text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Datos a eliminar *
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {dataTypeOptions.map((option) => {
                          const isSelected = requestForm.dataTypes.includes(option.id);
                          return (
                            <motion.button
                              key={option.id}
                              type="button"
                              onClick={() => toggleDataType(option.id)}
                              whileHover={{ y: -1, transition: { duration: 0.1 } }}
                              whileTap={{ scale: 0.97 }}
                              className={`flex items-center gap-2 p-2.5 rounded-xl text-left text-sm transition-all duration-150
                                ${isSelected
                                  ? 'bg-maple/15 text-maple border border-maple/30'
                                  : isDark
                                    ? 'bg-dark-surface text-gray-400 border border-dark-border hover:border-gray-600'
                                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-300'
                                }
                              `}
                            >
                              <option.icon className="w-4 h-4 flex-shrink-0" />
                              <span className="font-medium truncate">{option.label}</span>
                              {isSelected && <CheckCircle className="w-3.5 h-3.5 ml-auto flex-shrink-0" />}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Reason */}
                    <textarea
                      value={requestForm.reason}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, reason: e.target.value }))}
                      placeholder="Motivo (opcional)"
                      rows={2}
                      className={`w-full px-3 py-2.5 rounded-xl text-sm resize-none transition-all
                        ${isDark
                          ? 'bg-dark-surface border border-dark-border text-white placeholder-gray-500 focus:border-maple'
                          : 'bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-maple focus:bg-white'
                        }
                      `}
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-2 pt-2">
                    <motion.button
                      onClick={handleWhatsAppClick}
                      disabled={!isFormValid}
                      whileHover={isFormValid ? { y: -1, transition: { duration: 0.1 } } : {}}
                      whileTap={isFormValid ? { scale: 0.98 } : {}}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all
                        ${isFormValid
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                          : isDark
                            ? 'bg-dark-surface text-gray-600 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }
                      `}
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </motion.button>

                    <motion.button
                      onClick={handleEmailClick}
                      disabled={!isFormValid}
                      whileHover={isFormValid ? { y: -1, transition: { duration: 0.1 } } : {}}
                      whileTap={isFormValid ? { scale: 0.98 } : {}}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all
                        ${isFormValid
                          ? isDark
                            ? 'bg-dark-surface text-white border border-dark-border hover:bg-dark-border'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                          : isDark
                            ? 'bg-dark-surface text-gray-600 border border-dark-border cursor-not-allowed'
                            : 'bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed'
                        }
                      `}
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </motion.button>
                  </div>
                </motion.div>
              ) : activeTab === 'policy' ? (
                /* Policy Tab Content - Clean layout with animations */
                <motion.div
                  key="policy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-5"
                >
                  {/* Trust message - inline */}
                  <motion.div
                    className="flex items-start gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.02 }}
                  >
                    <Lock className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <strong className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>Tu privacidad es nuestra prioridad.</strong> Cumplimos con la Ley 1581 de 2012.
                    </p>
                  </motion.div>

                  {/* What we collect - 2 per row grid */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 }}
                  >
                    <h4 className={`text-sm font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ¿Qué datos recopilamos?
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { icon: User, label: 'Nombre', desc: 'Personalizar pedido' },
                        { icon: MessageCircle, label: 'WhatsApp', desc: 'Coordinar entrega' },
                        { icon: MapPin, label: 'Dirección', desc: 'Enviar pedido' }
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 + idx * 0.03 }}
                          whileHover={{ y: -2, transition: { duration: 0.1 } }}
                          className={`flex items-center gap-2.5 p-3 rounded-xl cursor-default transition-colors duration-150 ${isDark ? 'bg-dark-surface/70 hover:bg-dark-surface' : 'bg-gray-50 hover:bg-gray-100'}`}
                        >
                          <div className={`p-1.5 rounded-lg ${isDark ? 'bg-dark-bg-card' : 'bg-white shadow-sm'}`}>
                            <item.icon className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                          </div>
                          <div className="min-w-0">
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.label}</p>
                            <p className={`text-xs truncate ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* How we use - 2 per row */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h4 className={`text-sm font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ¿Cómo usamos tus datos?
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Procesar tu pedido',
                        'Estado de reserva',
                        'Coordinar envío'
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.15 + idx * 0.03 }}
                          whileHover={{ y: -2, transition: { duration: 0.1 } }}
                          className={`flex items-center gap-2 p-2.5 rounded-xl cursor-default transition-colors duration-150 ${isDark ? 'bg-dark-surface/70 hover:bg-dark-surface' : 'bg-gray-50 hover:bg-gray-100'}`}
                        >
                          <CheckCircle className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`} />
                          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* What we DON'T do - full width, highlighted */}
                  <motion.div
                    className={`p-4 rounded-xl ${isDark ? 'bg-maple/10 border border-maple/20' : 'bg-maple/5 border border-maple/10'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className="text-sm font-bold mb-3 text-maple flex items-center gap-2">
                      <UserX className="w-4 h-4" />
                      Lo que NO hacemos
                    </h4>
                    <div className="space-y-2">
                      {[
                        { bold: 'No vendemos', text: 'datos a terceros' },
                        { bold: 'No compartimos', text: 'con otras empresas' },
                        { bold: 'No enviamos', text: 'publicidad no solicitada' },
                        { bold: 'No almacenamos', text: 'datos de pago' }
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.45 + idx * 0.03 }}
                        >
                          <X className="w-3.5 h-3.5 text-maple flex-shrink-0" />
                          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            <strong className="text-maple">{item.bold}</strong> {item.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Legal - subtle */}
                  <motion.p
                    className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    Base legal: Ley 1581 de 2012, Decreto 1377 de 2013. Responsable: CollectPoint Colombia.
                  </motion.p>
                </motion.div>
              ) : (
                /* Rights Tab Content - 2 per row grid with animations */
                <motion.div
                  key="rights"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-5"
                >
                  {/* Header message */}
                  <motion.div
                    className="flex items-start gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.02 }}
                  >
                    <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <strong className={isDark ? 'text-blue-400' : 'text-blue-600'}>La Ley 1581 te garantiza</strong> control total sobre tus datos personales.
                    </p>
                  </motion.div>

                  {/* Rights Grid - 2 per row */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: Eye, title: 'Acceso', desc: 'Copia de tus datos', color: 'blue' },
                      { icon: FileText, title: 'Rectificación', desc: 'Corregir errores', color: 'purple' },
                      { icon: Trash2, title: 'Cancelación', desc: 'Eliminar datos', color: 'red' },
                      { icon: UserX, title: 'Revocación', desc: 'Retirar consentimiento', color: 'orange' }
                    ].map((right, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.05 + idx * 0.03 }}
                        whileHover={{ y: -2, transition: { duration: 0.1 } }}
                        className={`p-3 rounded-xl cursor-default transition-colors duration-150 ${isDark ? 'bg-dark-surface/70 hover:bg-dark-surface' : 'bg-gray-50 hover:bg-gray-100'}`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className={`p-1.5 rounded-lg
                            ${right.color === 'blue' ? isDark ? 'bg-blue-500/20' : 'bg-blue-100' : ''}
                            ${right.color === 'purple' ? isDark ? 'bg-purple-500/20' : 'bg-purple-100' : ''}
                            ${right.color === 'red' ? isDark ? 'bg-red-500/20' : 'bg-red-100' : ''}
                            ${right.color === 'orange' ? isDark ? 'bg-orange-500/20' : 'bg-orange-100' : ''}
                          `}>
                            <right.icon className={`w-4 h-4
                              ${right.color === 'blue' ? 'text-blue-500' : ''}
                              ${right.color === 'purple' ? 'text-purple-500' : ''}
                              ${right.color === 'red' ? 'text-red-500' : ''}
                              ${right.color === 'orange' ? 'text-orange-500' : ''}
                            `} />
                          </div>
                          <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            {right.title}
                          </span>
                        </div>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {right.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.div
                    className={`p-4 rounded-xl ${isDark ? 'bg-dark-surface' : 'bg-gray-50'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                  >
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <strong className={isDark ? 'text-white' : 'text-gray-800'}>¿Quieres ejercer tus derechos?</strong> Solicita acceso, modificación o eliminación de tus datos.
                    </p>
                    <motion.button
                      onClick={() => setShowRequestForm(true)}
                      whileHover={{ y: -1, transition: { duration: 0.1 } }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-maple text-white hover:bg-maple-dark transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Solicitar eliminación de datos
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ReserveSection = ({ cart = {} }) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    // New structured address fields
    departamento: 'bogota', // Default to Bogotá
    ciudad: 'Bogotá',
    viaType: '',
    viaNumber: '',
    cruceNumber: '',
    placaNumber: '',
    propertyType: '',
    propertyDetail: '', // Apto 301, Torre A, etc.
    notas: '',
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [selectedPlan, setSelectedPlan] = useState('flexible');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('breb');
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Payment methods data
  const paymentMethods = [
    { id: 'breb', name: 'Bre-B', description: 'Transferencia rápida', color: 'bg-blue-500', logo: 'Bre_B_Logo.png' },
    { id: 'nequi', name: 'Nequi', description: 'Pago móvil', color: 'bg-[#E6007E]', logo: 'Nequi_Logo.png' },
    { id: 'davibank', name: 'DaviBank', description: 'Pago móvil', color: 'bg-[#ED1C24]', logo: 'DaviBank_Logo.png' },
    { id: 'bancolombia', name: 'Bancolombia', description: 'Transferencia', color: 'bg-[#FDDA24]', logo: 'bancolombia_logo.png' },
    { id: 'distribuidor', name: 'Coordinar', description: 'Con distribuidor', color: 'bg-gray-500', logo: 'Coordinate_logo.png' },
    { id: 'efectivo', name: 'Efectivo', description: 'Pago en efectivo', color: 'bg-emerald-600', icon: Banknote },
  ];

  // Get cities for selected department
  const availableCities = getCitiesByDepartment(formData.departamento);
  const sortedDepartments = getSortedDepartments();

  // Build formatted address string
  const buildFormattedAddress = () => {
    let address = '';
    if (formData.viaType && formData.viaNumber) {
      const viaInfo = viaTypes.find(v => v.value === formData.viaType);
      address = `${viaInfo?.abbr || formData.viaType} ${formData.viaNumber}`;
      if (formData.cruceNumber) {
        address += ` #${formData.cruceNumber}`;
        if (formData.placaNumber) {
          address += `-${formData.placaNumber}`;
        }
      }
    }
    if (formData.propertyType) {
      const propDetail = formData.propertyDetail ? ` ${formData.propertyDetail}` : '';
      if (address) {
        address += `, ${formData.propertyType}${propDetail}`;
      } else {
        address = `${formData.propertyType}${propDetail}`;
      }
    }
    return address;
  };

  const formattedAddress = buildFormattedAddress();

  // Check if all required fields are filled (for showing payment section)
  const allFieldsFilled =
    formData.nombre.trim() !== '' &&
    formData.whatsapp.trim() !== '' &&
    formData.departamento !== '' &&
    formData.ciudad !== '' &&
    formData.viaType !== '' &&
    formData.viaNumber.trim() !== '' &&
    formData.cruceNumber.trim() !== '';

  // Get selected products from cart prop
  const selectedProducts = products
    .filter(p => cart[p.id] > 0)
    .map(p => ({ ...p, quantity: cart[p.id] }));

  // Check if any products are selected
  const hasProducts = selectedProducts.length > 0;

  // Calculate free albums: 1 free Pasta Blanda per every 2 Cajas
  const boxQuantity = cart[1] || 0;
  const freeAlbumCount = Math.floor(boxQuantity / 2);
  const qualifiesForGift = freeAlbumCount > 0;

  // Calculate totals
  const calculateTotals = () => {
    const productsTotal = selectedProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const freeAlbumsValue = freeAlbumCount * PASTA_BLANDA_PRICE;
    const totalToPay = productsTotal;

    return {
      productsTotal,
      freeAlbumsValue,
      totalToPay,
      flexiblePayment: Math.ceil(totalToPay / 4),
      rapidoPayment: Math.ceil(totalToPay / 2),
    };
  };

  const totals = calculateTotals();

  const formatProductsSummary = () => {
    return selectedProducts
      .map(p => `${p.quantity}x ${p.name}`)
      .join(', ') || 'Selecciona productos';
  };

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'El WhatsApp es requerido';
    } else if (!/^[0-9+\s()-]{7,15}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Ingresa un número válido';
    }

    if (!formData.departamento) {
      newErrors.departamento = 'Selecciona un departamento';
    }

    if (!formData.ciudad) {
      newErrors.ciudad = 'Selecciona una ciudad';
    }

    if (!formData.viaType) {
      newErrors.viaType = 'Selecciona el tipo de vía';
    }

    if (!formData.viaNumber.trim()) {
      newErrors.viaNumber = 'Ingresa el número de la vía';
    }

    if (!formData.cruceNumber.trim()) {
      newErrors.cruceNumber = 'Ingresa el número de cruce';
    }

    if (!selectedPaymentMethod) {
      newErrors.paymentMethod = 'Selecciona un método de pago';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitStatus('loading');

    try {
      const deptName = sortedDepartments.find(d => d.id === formData.departamento)?.name || formData.departamento;

      // Compute payment plan text
      let planPagoText = '4 cuotas'; // default
      if (selectedPlan === 'directo') {
        planPagoText = 'Pago directo';
      } else if (selectedPlan === 'rapido') {
        planPagoText = '2 cuotas';
      } else if (selectedPlan === 'flexible') {
        planPagoText = '4 cuotas';
      }

      // Compute cuota mensual
      let cuotaMensualValue = totals.flexiblePayment; // default
      if (selectedPlan === 'directo') {
        cuotaMensualValue = totals.totalToPay;
      } else if (selectedPlan === 'rapido') {
        cuotaMensualValue = totals.rapidoPayment;
      } else if (selectedPlan === 'flexible') {
        cuotaMensualValue = totals.flexiblePayment;
      }

      // Get payment method name
      const paymentMethodObj = paymentMethods.find(m => m.id === selectedPaymentMethod);
      const metodoPagoText = paymentMethodObj ? paymentMethodObj.name : selectedPaymentMethod;

      // Calculate total directly from cart to ensure it's never undefined
      const cajaQty = cart[1] || 0;
      const albumDuraQty = cart[2] || 0;
      const albumBlandaQty = cart[3] || 0;
      const sobreQty = cart[4] || 0;

      // Get prices from products array
      const cajaPrice = products.find(p => p.id === 1)?.price || 520000;
      const albumDuraPrice = products.find(p => p.id === 2)?.price || 69890;
      const albumBlandaPrice = products.find(p => p.id === 3)?.price || 12890;
      const sobrePrice = products.find(p => p.id === 4)?.price || 4990;

      // Calculate total directly
      const calculatedTotal = (cajaQty * cajaPrice) + (albumDuraQty * albumDuraPrice) +
        (albumBlandaQty * albumBlandaPrice) + (sobreQty * sobrePrice);

      // Calculate cuota based on plan
      let calculatedCuota = Math.ceil(calculatedTotal / 4); // default flexible
      if (selectedPlan === 'directo') {
        calculatedCuota = calculatedTotal;
      } else if (selectedPlan === 'rapido') {
        calculatedCuota = Math.ceil(calculatedTotal / 2);
      }

      // Build payload - ALL fields must be present, use 0 or '' as defaults
      const payload = {
        nombre: formData.nombre ? formData.nombre.trim() : '',
        whatsapp: formData.whatsapp ? formData.whatsapp.trim() : '',
        cajaDisplay: cajaQty,
        albumPastaDura: albumDuraQty,
        albumPastaBlanda: albumBlandaQty,
        sobreIndividual: sobreQty,
        regaloPastaBlanda: freeAlbumCount || 0,
        totalPagar: calculatedTotal,
        planPago: planPagoText,
        cuotaMensual: calculatedCuota,
        metodoPago: metodoPagoText,
        direccion: formattedAddress || '',
        ciudad: formData.ciudad || '',
        departamento: deptName || '',
        tipoInmueble: formData.propertyType || '',
        detalleInmueble: formData.propertyDetail || '',
        notas: formData.notas || '',
      };

      // Debug logging
      console.log('=== FORM SUBMISSION DEBUG ===');
      console.log('Cart:', cart);
      console.log('Quantities - Caja:', cajaQty, 'Dura:', albumDuraQty, 'Blanda:', albumBlandaQty, 'Sobre:', sobreQty);
      console.log('Calculated Total:', calculatedTotal);
      console.log('selectedPlan state:', selectedPlan);
      console.log('selectedPaymentMethod state:', selectedPaymentMethod);
      console.log('Computed planPago:', planPagoText);
      console.log('Computed metodoPago:', metodoPagoText);
      console.log('Computed cuotaMensual:', calculatedCuota);
      console.log('Full payload:', JSON.stringify(payload, null, 2));
      console.log('=============================');

      // Use a form-based approach that works reliably with Google Apps Script
      // This avoids the issues with no-cors mode truncating data
      const formBody = new URLSearchParams();
      formBody.append('data', JSON.stringify(payload));

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formBody,
      });

      setSubmitStatus('success');

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };

      // Reset city when department changes
      if (field === 'departamento') {
        const cities = getCitiesByDepartment(value);
        newData.ciudad = cities[0] || '';
      }

      return newData;
    });

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleRetry = () => {
    setSubmitStatus('idle');
  };

  const handleNewReservation = () => {
    setFormData({
      nombre: '',
      whatsapp: '',
      departamento: 'bogota',
      ciudad: 'Bogotá',
      viaType: '',
      viaNumber: '',
      cruceNumber: '',
      placaNumber: '',
      propertyType: '',
      propertyDetail: '',
      notas: '',
    });
    setSubmitStatus('idle');
  };

  // Common input styles
  const inputClassName = (hasError, isDisabled) => `
    w-full pl-12 pr-4 py-3.5 border-2 rounded-xl
    focus:outline-none appearance-none
    ${isDark
      ? `bg-dark-surface border-dark-border text-dark-text placeholder-dark-text-subtle
         focus:border-maple
         ${hasError ? 'border-red-500 focus:border-red-500' : ''}`
      : `bg-white border-warm-tan/50 text-warm-brown placeholder-warm-gray
         focus:border-maple
         ${hasError ? 'border-red-400 focus:border-red-400' : ''}`
    }
    ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
    transition-colors duration-200
  `;

  const smallInputClassName = (hasError, isDisabled) => `
    w-full px-3 py-3.5 border-2 rounded-xl text-center
    focus:outline-none appearance-none
    ${isDark
      ? `bg-dark-surface border-dark-border text-dark-text placeholder-dark-text-subtle
         focus:border-maple
         ${hasError ? 'border-red-500 focus:border-red-500' : ''}`
      : `bg-white border-warm-tan/50 text-warm-brown placeholder-warm-gray
         focus:border-maple
         ${hasError ? 'border-red-400 focus:border-red-400' : ''}`
    }
    ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
    transition-colors duration-200
  `;

  return (
    <section id="contact" className={`py-16 sm:py-24 px-6 transition-colors duration-300
      ${isDark ? 'bg-dark-bg-elevated' : 'bg-warm-cream'}
    `}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3
            ${isDark ? 'text-white' : 'text-warm-brown'}
          `}>
            Completa tu <span className="text-maple">Reserva</span>
          </h2>
          <p className={isDark ? 'text-gray-400' : 'text-warm-gray'}>
            {hasProducts
              ? formatProductsSummary()
              : 'Completa el formulario con tus datos'
            }
          </p>
        </motion.div>

        {/* Main Layout: Form + Summary Side by Side */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">

          {/* Left Column: Contact Form with Payment Plan (3/5 width) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className={`rounded-2xl p-6 sm:p-8 ${isDark ? 'bg-dark-bg-card shadow-xl' : 'glass-card'}`}>
              <AnimatePresence mode="wait">
                {/* Form State: Idle or Loading */}
                {(submitStatus === 'idle' || submitStatus === 'loading') && (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    {/* Personal Info Section */}
                    <div className="space-y-4">
                      <h3 className={`font-semibold text-sm flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-warm-brown'}`}>
                        <User className="w-4 h-4 text-maple" />
                        Información de Contacto
                      </h3>

                      {/* Nombre Field */}
                      <div>
                        <div className="relative">
                          <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? 'text-gray-500' : 'text-warm-gray'}`} />
                          <input
                            type="text"
                            value={formData.nombre}
                            onChange={(e) => handleInputChange('nombre', e.target.value)}
                            placeholder="Tu nombre completo"
                            disabled={submitStatus === 'loading'}
                            className={inputClassName(errors.nombre, submitStatus === 'loading')}
                          />
                        </div>
                        {errors.nombre && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-red-500 text-sm flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.nombre}
                          </motion.p>
                        )}
                      </div>

                      {/* WhatsApp Field */}
                      <div>
                        <div className="relative">
                          <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? 'text-gray-500' : 'text-warm-gray'}`} />
                          <input
                            type="tel"
                            value={formData.whatsapp}
                            onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                            placeholder="300 123 4567"
                            disabled={submitStatus === 'loading'}
                            className={inputClassName(errors.whatsapp, submitStatus === 'loading')}
                          />
                        </div>
                        {errors.whatsapp && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-red-500 text-sm flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.whatsapp}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    {/* Delivery Section */}
                    <div className="space-y-4 pt-2">
                      <h3 className={`font-semibold text-sm flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-warm-brown'}`}>
                        <Truck className="w-4 h-4 text-maple" />
                        Dirección de Entrega
                      </h3>

                      {/* Department & City Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Departamento */}
                        <div>
                          <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                            Departamento
                          </label>
                          <SearchableSelect
                            options={sortedDepartments}
                            value={formData.departamento}
                            onChange={(val) => handleInputChange('departamento', val)}
                            placeholder="Seleccionar..."
                            disabled={submitStatus === 'loading'}
                            hasError={errors.departamento}
                            isDark={isDark}
                            icon={MapPin}
                          />
                          {errors.departamento && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 text-red-500 text-sm flex items-center gap-1"
                            >
                              <AlertCircle className="w-4 h-4" />
                              {errors.departamento}
                            </motion.p>
                          )}
                        </div>

                        {/* Ciudad */}
                        <div>
                          <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                            Ciudad
                          </label>
                          <SearchableSelect
                            options={availableCities}
                            value={formData.ciudad}
                            onChange={(val) => handleInputChange('ciudad', val)}
                            placeholder="Seleccionar..."
                            disabled={submitStatus === 'loading' || !formData.departamento}
                            hasError={errors.ciudad}
                            isDark={isDark}
                            icon={Building2}
                          />
                          {errors.ciudad && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 text-red-500 text-sm flex items-center gap-1"
                            >
                              <AlertCircle className="w-4 h-4" />
                              {errors.ciudad}
                            </motion.p>
                          )}
                        </div>
                      </div>

                      {/* Address Structure */}
                      <div>
                        <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                          Dirección
                        </label>
                        {/* Address fields - responsive grid layout */}
                        <div className="grid grid-cols-12 gap-2 items-center">
                          {/* Via Type - takes more space on mobile */}
                          <div className="col-span-5 sm:col-span-4">
                            <SearchableSelect
                              options={viaTypes}
                              value={formData.viaType}
                              onChange={(val) => handleInputChange('viaType', val)}
                              placeholder="Calle"
                              disabled={submitStatus === 'loading'}
                              hasError={errors.viaType}
                              isDark={isDark}
                              searchable={false}
                            />
                          </div>

                          {/* Via Number */}
                          <div className="col-span-3 sm:col-span-2">
                            <input
                              type="text"
                              value={formData.viaNumber}
                              onChange={(e) => handleInputChange('viaNumber', e.target.value)}
                              placeholder="45"
                              disabled={submitStatus === 'loading'}
                              className={smallInputClassName(errors.viaNumber, submitStatus === 'loading')}
                            />
                          </div>

                          <span className={`col-span-1 text-center text-lg font-bold ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>#</span>

                          {/* Cruce Number */}
                          <div className="col-span-3 sm:col-span-2">
                            <input
                              type="text"
                              value={formData.cruceNumber}
                              onChange={(e) => handleInputChange('cruceNumber', e.target.value)}
                              placeholder="23"
                              disabled={submitStatus === 'loading'}
                              className={smallInputClassName(errors.cruceNumber, submitStatus === 'loading')}
                            />
                          </div>

                          {/* Second row on mobile, same row on desktop */}
                          <span className={`col-span-1 sm:col-span-1 text-center text-lg font-bold ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>-</span>

                          {/* Placa Number */}
                          <div className="col-span-3 sm:col-span-2">
                            <input
                              type="text"
                              value={formData.placaNumber}
                              onChange={(e) => handleInputChange('placaNumber', e.target.value)}
                              placeholder="10"
                              disabled={submitStatus === 'loading'}
                              className={smallInputClassName(false, submitStatus === 'loading')}
                            />
                          </div>
                        </div>

                        {/* Google Maps Button - on its own row */}
                        <motion.button
                          type="button"
                          onClick={() => setIsMapModalOpen(true)}
                          disabled={submitStatus === 'loading'}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 w-full
                            ${isDark
                              ? 'bg-dark-surface border-dark-border text-gray-300 hover:border-maple hover:text-maple'
                              : 'bg-white border-warm-tan/50 text-warm-gray hover:border-maple hover:text-maple'
                            }
                            ${submitStatus === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}
                          `}
                        >
                          <Map className="w-5 h-5" />
                          <span className="text-sm font-medium">Buscar dirección en Google Maps</span>
                        </motion.button>
                        {(errors.viaType || errors.viaNumber || errors.cruceNumber) && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-red-500 text-sm flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            Completa la dirección
                          </motion.p>
                        )}
                        {/* Preview */}
                        {formattedAddress && (
                          <p className={`mt-2 text-xs ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                            Vista previa: <span className={isDark ? 'text-white' : 'text-warm-brown'}>{formattedAddress}</span>
                          </p>
                        )}
                      </div>

                      {/* Property Type Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Property Type */}
                        <div>
                          <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                            Tipo de inmueble (opcional)
                          </label>
                          <SearchableSelect
                            options={propertyTypes}
                            value={formData.propertyType}
                            onChange={(val) => handleInputChange('propertyType', val)}
                            placeholder="Seleccionar..."
                            disabled={submitStatus === 'loading'}
                            hasError={false}
                            isDark={isDark}
                            icon={Home}
                            searchable={false}
                          />
                        </div>

                        {/* Property Detail */}
                        <div>
                          <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                            Detalle (opcional)
                          </label>
                          <input
                            type="text"
                            value={formData.propertyDetail}
                            onChange={(e) => handleInputChange('propertyDetail', e.target.value)}
                            placeholder="Apto 301, Torre A..."
                            disabled={submitStatus === 'loading'}
                            className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors duration-200
                              ${isDark
                                ? 'bg-dark-surface border-dark-border text-dark-text placeholder-dark-text-subtle focus:border-maple'
                                : 'bg-white border-warm-tan/50 text-warm-brown placeholder-warm-gray focus:border-maple'
                              }
                              ${submitStatus === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                          />
                        </div>
                      </div>

                      {/* Notes Field */}
                      <div>
                        <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                          Notas adicionales (opcional)
                        </label>
                        <textarea
                          value={formData.notas}
                          onChange={(e) => {
                            if (e.target.value.length <= 300) {
                              handleInputChange('notas', e.target.value);
                            }
                          }}
                          placeholder="Indicaciones especiales para la entrega..."
                          disabled={submitStatus === 'loading'}
                          rows={2}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none resize-none transition-colors duration-200
                            ${isDark
                              ? 'bg-dark-surface border-dark-border text-dark-text placeholder-dark-text-subtle focus:border-maple'
                              : 'bg-white border-warm-tan/50 text-warm-brown placeholder-warm-gray focus:border-maple'
                            }
                            ${submitStatus === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}
                          `}
                        />
                        <p className={`text-xs mt-1 text-right ${isDark ? 'text-gray-500' : 'text-warm-gray/70'}`}>
                          {formData.notas.length}/300
                        </p>
                      </div>

                      {/* Delivery Timeline Info */}
                      <div className={`flex items-start gap-3 p-3 rounded-xl text-sm ${isDark ? 'bg-dark-surface' : 'bg-warm-cream-light/80'}`}>
                        <Calendar className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        <div>
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                            Entrega: Primera semana de Mayo 2026
                          </p>
                          <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                            Coincide con el lanzamiento oficial en Colombia
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Plan Section - Appears after all fields are filled */}
                    <AnimatePresence>
                      {allFieldsFilled && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <motion.div
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                            className="space-y-4 pt-2"
                          >
                            {/* Combined Payment Method & Plan Selection */}
                            <h3 className={`font-semibold text-sm flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-warm-brown'}`}>
                              <CreditCard className="w-4 h-4 text-maple" />
                              Método y Plan de Pago
                            </h3>

                            {/* Mobile: Stacked layout, Desktop: Side by side */}
                            <div className="flex flex-col sm:flex-row gap-3">
                              {/* Selected method - vertical card with payment plan options */}
                              <div
                                className={`w-full sm:w-28 md:w-32 flex-shrink-0 p-3 rounded-xl border-2 transition-all duration-200 flex flex-col
                                    ${isDark
                                    ? 'border-dark-border bg-dark-surface'
                                    : 'border-warm-tan/30 bg-warm-cream-light/50'
                                  }
                                  `}
                              >
                                {/* Mobile: Horizontal layout, Desktop: Vertical */}
                                <div className="flex sm:flex-col items-center gap-3 sm:gap-0 sm:mb-3">
                                  {/* Logo */}
                                  <div className="flex-shrink-0">
                                    {(() => {
                                      const method = paymentMethods.find(m => m.id === selectedPaymentMethod);
                                      const IconComponent = method?.icon;
                                      return method?.logo ? (
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ring-2 ring-maple ring-offset-2 ${isDark ? 'ring-offset-dark-surface bg-white' : 'ring-offset-warm-cream-light bg-white'}`}>
                                          <img
                                            src={getAssetPath(`images/${method.logo}`)}
                                            alt={method.name}
                                            className="w-10 h-10 object-contain"
                                          />
                                        </div>
                                      ) : IconComponent ? (
                                        <div
                                          className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ring-2 ring-maple ring-offset-2 ${isDark ? 'ring-offset-dark-surface' : 'ring-offset-warm-cream-light'}
                                              ${method?.color}
                                            `}
                                        >
                                          <IconComponent className="w-6 h-6" />
                                        </div>
                                      ) : (
                                        <div
                                          className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-base font-bold ring-2 ring-maple ring-offset-2 ${isDark ? 'ring-offset-dark-surface' : 'ring-offset-warm-cream-light'}
                                              ${method?.color}
                                            `}
                                        >
                                          {method?.name.substring(0, 2).toUpperCase()}
                                        </div>
                                      );
                                    })()}
                                  </div>
                                  {/* Name + Plan buttons on mobile */}
                                  <div className="flex-1 sm:text-center">
                                    <p className={`text-sm font-extrabold sm:mt-2 ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                                      {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                                    </p>
                                    {/* Plan selection buttons - horizontal on mobile, vertical on desktop */}
                                    <div className="flex sm:flex-col gap-1.5 mt-2 sm:mt-3">
                                      {/* Pago Directo */}
                                      <button
                                        type="button"
                                        onClick={() => setSelectedPlan('directo')}
                                        className={`flex-1 sm:w-full py-1.5 px-2 rounded-lg text-center transition-all duration-200 hover:scale-[1.02] active:scale-95
                                            ${selectedPlan === 'directo'
                                            ? 'bg-maple text-white'
                                            : isDark
                                              ? 'bg-dark-bg-card text-gray-400 hover:bg-dark-border'
                                              : 'bg-white text-warm-gray hover:bg-warm-tan/20'
                                          }
                                          `}
                                      >
                                        <p className={`text-[10px] ${selectedPlan === 'directo' ? 'font-bold' : 'font-medium'}`}>Directo</p>
                                      </button>

                                      {/* 2 Cuotas */}
                                      <button
                                        type="button"
                                        onClick={() => setSelectedPlan('rapido')}
                                        className={`flex-1 sm:w-full py-1.5 px-2 rounded-lg text-center transition-all duration-200 hover:scale-[1.02] active:scale-95
                                            ${selectedPlan === 'rapido'
                                            ? 'bg-maple text-white'
                                            : isDark
                                              ? 'bg-dark-bg-card text-gray-400 hover:bg-dark-border'
                                              : 'bg-white text-warm-gray hover:bg-warm-tan/20'
                                          }
                                          `}
                                      >
                                        <p className={`text-[10px] ${selectedPlan === 'rapido' ? 'font-bold' : 'font-medium'}`}>2 Cuotas</p>
                                      </button>

                                      {/* 4 Cuotas */}
                                      <button
                                        type="button"
                                        onClick={() => setSelectedPlan('flexible')}
                                        className={`flex-1 sm:w-full py-1.5 px-2 rounded-lg text-center transition-all duration-200 hover:scale-[1.02] active:scale-95
                                            ${selectedPlan === 'flexible'
                                            ? 'bg-maple text-white'
                                            : isDark
                                              ? 'bg-dark-bg-card text-gray-400 hover:bg-dark-border'
                                              : 'bg-white text-warm-gray hover:bg-warm-tan/20'
                                          }
                                          `}
                                      >
                                        <p className={`text-[10px] ${selectedPlan === 'flexible' ? 'font-bold' : 'font-medium'}`}>4 Cuotas</p>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Plan details + other payment methods */}
                              <div className="flex-1 flex flex-col gap-3 min-w-0">
                                {/* Plan details card */}
                                <div
                                  className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300
                                      ${isDark
                                      ? 'border-maple/50 bg-maple/5'
                                      : 'border-maple/50 bg-maple/5'
                                    }
                                    `}
                                >
                                  <p className={`text-[10px] uppercase tracking-wide mb-1 ${isDark ? 'text-maple/70' : 'text-maple/70'}`}>
                                    {selectedPlan === 'directo' ? 'Pago Único' : selectedPlan === 'rapido' ? '2 Cuotas' : '4 Cuotas'}
                                  </p>
                                  <p className={`text-xl sm:text-2xl font-bold text-maple`}>
                                    {hasProducts ? (
                                      <>
                                        {selectedPlan === 'directo'
                                          ? formatCurrency(totals.totalToPay)
                                          : selectedPlan === 'rapido'
                                            ? formatCurrency(totals.rapidoPayment)
                                            : formatCurrency(totals.flexiblePayment)
                                        }
                                        {selectedPlan !== 'directo' && (
                                          <span className={`text-xs font-normal ml-1 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>/mes</span>
                                        )}
                                      </>
                                    ) : (
                                      <span className={`text-sm font-normal ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                                        Selecciona productos arriba
                                      </span>
                                    )}
                                  </p>
                                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                                    {selectedPlan === 'directo'
                                      ? 'Un solo pago, sin cuotas'
                                      : selectedPlan === 'rapido'
                                        ? 'Febrero y Abril — primeros 5 días'
                                        : 'Feb, Mar, Abr, May — primeros 5 días'
                                    }
                                  </p>
                                </div>

                                {/* Other payment methods - grid on mobile, flex row on desktop */}
                                <div className="grid grid-cols-5 sm:flex gap-1.5 sm:gap-2">
                                  {paymentMethods
                                    .filter(m => m.id !== selectedPaymentMethod)
                                    .map((method) => (
                                      <button
                                        key={method.id}
                                        type="button"
                                        onClick={() => setSelectedPaymentMethod(method.id)}
                                        disabled={submitStatus === 'loading'}
                                        className={`sm:flex-1 py-2 sm:py-3 px-1 sm:px-2 rounded-xl border-2 text-center transition-all duration-200 hover:scale-[1.02] active:scale-95 flex flex-col items-center justify-center
                                            ${submitStatus === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}
                                            ${isDark
                                            ? 'border-dark-border hover:border-maple/50 bg-dark-surface'
                                            : 'border-warm-tan/40 hover:border-maple/50 bg-warm-cream-light/50'
                                          }
                                          `}
                                      >
                                        {method.logo ? (
                                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center bg-white">
                                            <img
                                              src={getAssetPath(`images/${method.logo}`)}
                                              alt={method.name}
                                              className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                                            />
                                          </div>
                                        ) : method.icon ? (
                                          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white
                                              ${method.color}
                                            `}>
                                            <method.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                          </div>
                                        ) : (
                                          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white text-[8px] sm:text-[10px] font-bold
                                              ${method.color}
                                            `}>
                                            {method.name.substring(0, 2).toUpperCase()}
                                          </div>
                                        )}
                                        <p className={`text-[7px] sm:text-[9px] font-medium mt-1 sm:mt-1.5 truncate w-full ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                                          {method.name}
                                        </p>
                                      </button>
                                    ))}
                                </div>
                              </div>
                            </div>

                            {/* Payment info note */}
                            <p className={`text-xs mt-3 ${isDark ? 'text-gray-500' : 'text-warm-gray/70'}`}>
                              * El costo del envío es adicional y se coordina al momento de la entrega.
                            </p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={!hasProducts || submitStatus === 'loading'}
                      className={`w-full py-4 font-semibold rounded-xl transition-all duration-150 ease-out flex items-center justify-center gap-2
                        ${hasProducts && submitStatus !== 'loading'
                          ? 'bg-maple text-white shadow-lg shadow-maple/25 hover:bg-maple-dark hover:shadow-xl hover:shadow-maple/35 hover:scale-[1.02] active:scale-[0.98]'
                          : isDark
                            ? 'bg-dark-surface text-gray-500 cursor-not-allowed'
                            : 'bg-warm-gray/30 text-warm-gray cursor-not-allowed'
                        }
                      `}
                    >
                      {submitStatus === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        'Confirmar Reserva'
                      )}
                    </button>

                    {!hasProducts && (
                      <p className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                        ↑ Selecciona al menos un producto primero
                      </p>
                    )}
                  </motion.form>
                )}

                {/* Success State */}
                {submitStatus === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-6"
                  >
                    <motion.div
                      className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    >
                      <CheckCircle className="w-8 h-8 text-emerald-400" />
                    </motion.div>

                    <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                      ¡Reserva Recibida!
                    </h3>

                    <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-warm-gray'}`}>
                      Te contactaremos en las próximas{' '}
                      <span className="font-semibold text-maple">12 horas hábiles</span>.
                    </p>

                    {/* Selected Products Summary */}
                    {hasProducts && (
                      <div className={`rounded-xl p-4 mb-6 text-left ${isDark ? 'bg-dark-surface' : 'bg-warm-cream-light'}`}>
                        <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>Tu reserva:</p>
                        <div className="space-y-2">
                          {selectedProducts.map((product) => (
                            <div key={product.id} className="flex items-center justify-between text-sm">
                              <span className={isDark ? 'text-white' : 'text-warm-brown'}>
                                {product.quantity}x {product.name}
                              </span>
                              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                                {formatCurrency(product.price * product.quantity)}
                              </span>
                            </div>
                          ))}
                          {qualifiesForGift && (
                            <div className="flex items-center justify-between text-sm">
                              <span className={isDark ? 'text-emerald-300' : 'text-emerald-700'}>
                                +{freeAlbumCount} Álbum{freeAlbumCount > 1 ? 'es' : ''} Pasta Blanda
                              </span>
                              <span className={`text-xs font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                GRATIS
                              </span>
                            </div>
                          )}
                        </div>
                        <div className={`border-t mt-3 pt-3 ${isDark ? 'border-dark-border' : 'border-warm-tan/30'}`}>
                          <div className="flex justify-between items-center">
                            <span className={`font-semibold ${isDark ? 'text-white' : 'text-warm-brown'}`}>Total:</span>
                            <span className="font-bold text-maple">{formatCurrency(totals.totalToPay)}</span>
                          </div>
                          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                            Plan: {selectedPlan === 'flexible' ? '4 cuotas' : '2 cuotas'} de {formatCurrency(selectedPlan === 'flexible' ? totals.flexiblePayment : totals.rapidoPayment)}
                          </p>
                          <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                            📍 {formattedAddress}, {formData.ciudad}
                          </p>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleNewReservation}
                      className={`text-sm transition-colors flex items-center gap-2 mx-auto ${isDark ? 'text-gray-400 hover:text-white' : 'text-warm-gray hover:text-maple'}`}
                    >
                      <RefreshCw className="w-4 h-4" />
                      Hacer otra reserva
                    </button>
                  </motion.div>
                )}

                {/* Error State */}
                {submitStatus === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-6"
                  >
                    <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
                      <AlertCircle className="w-7 h-7 text-red-400" />
                    </div>

                    <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                      Error al enviar
                    </h3>

                    <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                      Hubo un problema. Por favor intenta de nuevo.
                    </p>

                    <button
                      onClick={handleRetry}
                      className="font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-150 flex items-center gap-2 mx-auto
                        bg-maple text-white shadow-maple/25 hover:bg-maple-dark hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Intentar de nuevo
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Privacy note - Combined message with hyperlink */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <Shield className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                No vendemos ni compartimos tus datos.
              </span>
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(true)}
                className={`text-xs font-medium underline underline-offset-2 transition-colors
                  ${isDark ? 'text-maple-light hover:text-maple' : 'text-maple hover:text-maple-dark'}
                `}
              >
                Ver política
              </button>
            </div>
          </motion.div>

          {/* Right Column: Order Summary Only (2/5 width) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Order Summary Card */}
            <div className={`rounded-2xl p-5 shadow-lg ${isDark ? 'bg-dark-bg-card' : 'bg-white'}`}>
              <h3 className={`font-semibold text-sm mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                <CreditCard className="w-4 h-4 text-maple" />
                Resumen del Pedido
              </h3>

              {hasProducts ? (
                <div className="space-y-3">
                  {/* Product List */}
                  {selectedProducts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={scrollToProducts}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 group
                        ${isDark
                          ? 'bg-dark-surface border-dark-border hover:border-maple/50'
                          : 'bg-warm-cream-light/50 border-warm-tan/30 hover:border-maple/50'
                        }
                      `}
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                        <img
                          src={getAssetPath(product.image)}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm truncate ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                          {product.name}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                          {product.quantity} × {product.priceFormatted}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                          {formatCurrency(product.price * product.quantity)}
                        </span>
                      </div>
                    </button>
                  ))}

                  {/* Free Gift Item - Shows when 2+ boxes */}
                  <AnimatePresence>
                    {qualifiesForGift && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 border-dashed
                          ${isDark
                            ? 'bg-emerald-900/20 border-emerald-500/40'
                            : 'bg-emerald-50 border-emerald-400/50'
                          }
                        `}
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                          <img
                            src={img('product-album.png')}
                            alt="Álbum Pasta Blanda"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium text-sm truncate ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                            {freeAlbumCount} Álbum{freeAlbumCount > 1 ? 'es' : ''} Pasta Blanda
                          </p>
                          <p className={`text-xs ${isDark ? 'text-emerald-400/70' : 'text-emerald-600/80'}`}>
                            Regalo por {boxQuantity} Cajas (1 c/2)
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-lg font-bold text-xs flex-shrink-0
                          ${isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}
                        `}>
                          GRATIS
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Subtotal / Total */}
                  <div className={`border-t pt-3 mt-3 ${isDark ? 'border-dark-border' : 'border-warm-tan/30'}`}>
                    {qualifiesForGift && (
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-warm-gray'}`}>
                          Valor del regalo:
                        </span>
                        <span className={`text-xs line-through ${isDark ? 'text-gray-500' : 'text-warm-gray/70'}`}>
                          {formatCurrency(totals.freeAlbumsValue)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-warm-brown'}`}>
                        Total a Pagar:
                      </span>
                      <span className="font-bold text-xl text-maple">
                        {formatCurrency(totals.totalToPay)}
                      </span>
                    </div>
                  </div>

                  {/* Add more button */}
                  <button
                    type="button"
                    onClick={scrollToProducts}
                    className={`w-full py-2 text-sm font-medium rounded-lg transition-colors
                      ${isDark
                        ? 'text-maple hover:bg-maple/10'
                        : 'text-maple hover:bg-maple/5'
                      }
                    `}
                  >
                    + Agregar más productos
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={scrollToProducts}
                  className={`w-full p-6 rounded-xl border-2 border-dashed text-center transition-all duration-200
                    ${isDark
                      ? 'border-dark-border hover:border-maple/50 text-gray-400 hover:text-maple'
                      : 'border-warm-tan/50 hover:border-maple/50 text-warm-gray hover:text-maple'
                    }
                  `}
                >
                  <CreditCard className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="font-medium">Carrito vacío</p>
                  <p className="text-xs opacity-75 mt-1">Haz clic para seleccionar productos</p>
                </button>
              )}
            </div>

            {/* Promo Tip - Shows when close to unlocking gift */}
            {boxQuantity === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl p-4 border-2 border-dashed
                  ${isDark
                    ? 'bg-amber-900/20 border-amber-500/40'
                    : 'bg-amber-50 border-amber-400/50'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <Gift className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                  <div>
                    <p className={`font-medium text-sm ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                      ¡Estás a 1 caja de un regalo!
                    </p>
                    <p className={`text-xs mt-0.5 ${isDark ? 'text-amber-400/70' : 'text-amber-600/80'}`}>
                      Agrega otra Caja Display y recibe 1 Álbum Pasta Blanda gratis.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Google Maps Modal */}
      <GoogleMapsModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        onSelectAddress={(addressData, options = { departmentCity: true, address: true }) => {
          // Fill in department and city if option is enabled
          if (options.departmentCity && (addressData.state || addressData.city)) {
            // Find matching department
            const normalizeStr = (str) => str?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') || '';
            const stateNorm = normalizeStr(addressData.state);
            const cityNorm = normalizeStr(addressData.city);

            // Special handling for Bogotá
            if (stateNorm.includes('bogota') || cityNorm.includes('bogota')) {
              handleInputChange('department', 'bogota');
              setTimeout(() => handleInputChange('city', 'Bogotá'), 50);
            } else {
              // Find department by name match
              const matchedDept = departments.find(dept => {
                const deptNorm = normalizeStr(dept.name);
                return deptNorm.includes(stateNorm) || stateNorm.includes(deptNorm);
              });

              if (matchedDept) {
                handleInputChange('department', matchedDept.id);
                // Find matching city within department
                setTimeout(() => {
                  const matchedCity = matchedDept.cities.find(city => {
                    const cityListNorm = normalizeStr(city);
                    return cityListNorm.includes(cityNorm) || cityNorm.includes(cityListNorm);
                  });
                  if (matchedCity) {
                    handleInputChange('city', matchedCity);
                  }
                }, 50);
              }
            }
          }

          // Fill in the address fields if option is enabled
          if (options.address) {
            if (addressData.viaType) {
              handleInputChange('viaType', addressData.viaType);
            }
            if (addressData.viaNumber) {
              handleInputChange('viaNumber', addressData.viaNumber);
            }
            if (addressData.cruceNumber) {
              handleInputChange('cruceNumber', addressData.cruceNumber);
            }
            if (addressData.placaNumber) {
              handleInputChange('placaNumber', addressData.placaNumber);
            }
          }
        }}
        isDark={isDark}
      />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        isDark={isDark}
      />
    </section>
  );
};

export default ReserveSection;
