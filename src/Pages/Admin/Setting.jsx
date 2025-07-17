import React, { useState, lazy, Suspense } from 'react';
import { 
  FiSettings,
  FiUser,
  FiLock,
  FiBell,
  FiMail,
  FiCreditCard,
  FiGlobe,
  FiSave,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiMapPin,
  FiClock,
  FiLogOut
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../../Component/Admin/AdminDashboard';

// Lazy load the map component
const LoginLocationMap = lazy(() => import('../../Component/Map/LoginLocationMap'));

const SettingsPage = () => {
  // Account Settings
  const [accountInfo, setAccountInfo] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '(123) 456-7890',
    language: 'English',
    timezone: 'UTC+00:00'
  });

  // Security Settings
  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    passwordExpiration: 90,
    loginAlerts: true
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    newsletter: true,
    productUpdates: false
  });

  // Login Sessions
  const [loginSessions, setLoginSessions] = useState([
    {
      id: 1,
      device: 'MacBook Pro (Chrome)',
      ip: '192.168.1.1',
      location: 'San Francisco, CA',
      coordinates: [37.7749, -122.4194],
      time: '2023-05-15T10:30:00Z',
      current: true
    },
    {
      id: 2,
      device: 'iPhone 13 (Safari)',
      ip: '203.0.113.42',
      location: 'New York, NY',
      coordinates: [40.7128, -74.0060],
      time: '2023-05-14T15:45:00Z',
      current: false
    },
    {
      id: 3,
      device: 'Windows PC (Firefox)',
      ip: '198.51.100.36',
      location: 'London, UK',
      coordinates: [51.5074, -0.1278],
      time: '2023-05-10T08:20:00Z',
      current: false
    }
  ]);

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [tempSettings, setTempSettings] = useState({});

  // Toggle section
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Start editing
  const startEditing = (section) => {
    setTempSettings({
      account: {...accountInfo},
      security: {...security},
      notifications: {...notifications}
    });
    setIsEditing(true);
    setActiveSection(section);
  };

  // Cancel editing
  const cancelEditing = () => {
    setIsEditing(false);
    setActiveSection(null);
  };

  // Save changes
  const saveChanges = () => {
    if (activeSection === 'account') {
      setAccountInfo(tempSettings.account);
    } else if (activeSection === 'security') {
      setSecurity(tempSettings.security);
    } else if (activeSection === 'notifications') {
      setNotifications(tempSettings.notifications);
    }
    setIsEditing(false);
  };

  // Handle input change
  const handleInputChange = (section, field, value) => {
    setTempSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Terminate session
  const terminateSession = (sessionId) => {
    setLoginSessions(loginSessions.filter(session => session.id !== sessionId));
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Toggle switch component
  const ToggleSwitch = ({ enabled, setEnabled }) => (
    <button
      type="button"
      className={`${enabled ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
      onClick={() => setEnabled(!enabled)}
    >
      <span
        className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
  );

  // Settings sections
  const settingsSections = [
    {
      id: 'account',
      icon: <FiUser className="text-indigo-500" />,
      title: 'Account Information',
      fields: [
        { label: 'Full Name', type: 'text', value: accountInfo.name, field: 'name' },
        { label: 'Email', type: 'email', value: accountInfo.email, field: 'email' },
        { label: 'Phone Number', type: 'tel', value: accountInfo.phone, field: 'phone' },
        { 
          label: 'Language', 
          type: 'select', 
          value: accountInfo.language, 
          field: 'language',
          options: ['English', 'Spanish', 'French', 'German', 'Chinese']
        },
        { 
          label: 'Timezone', 
          type: 'select', 
          value: accountInfo.timezone, 
          field: 'timezone',
          options: ['UTC+00:00', 'UTC-05:00', 'UTC-08:00', 'UTC+01:00', 'UTC+03:00']
        }
      ]
    },
    {
      id: 'security',
      icon: <FiLock className="text-indigo-500" />,
      title: 'Security Settings',
      fields: [
        { 
          label: 'Two-Factor Authentication', 
          type: 'toggle', 
          value: security.twoFactorAuth, 
          field: 'twoFactorAuth',
          description: 'Add an extra layer of security to your account'
        },
        { 
          label: 'Password Expiration', 
          type: 'select', 
          value: security.passwordExpiration, 
          field: 'passwordExpiration',
          options: [30, 60, 90, 180],
          unit: 'days',
          description: 'Require password change after this period'
        },
        { 
          label: 'Login Alerts', 
          type: 'toggle', 
          value: security.loginAlerts, 
          field: 'loginAlerts',
          description: 'Get notified when someone logs into your account'
        }
      ]
    },
    {
      id: 'notifications',
      icon: <FiBell className="text-indigo-500" />,
      title: 'Notification Preferences',
      fields: [
        { 
          label: 'Email Notifications', 
          type: 'toggle', 
          value: notifications.email, 
          field: 'email',
          description: 'Receive important updates via email'
        },
        { 
          label: 'SMS Notifications', 
          type: 'toggle', 
          value: notifications.sms, 
          field: 'sms',
          description: 'Receive important updates via text message'
        },
        { 
          label: 'Push Notifications', 
          type: 'toggle', 
          value: notifications.push, 
          field: 'push',
          description: 'Receive notifications on your mobile device'
        }
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center p-6 border-b">
          <FiSettings className="text-indigo-600 text-2xl mr-3" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
            <p className="text-sm text-gray-500">Manage your account preferences and security settings</p>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="divide-y divide-gray-200">
          {settingsSections.map((section) => (
            <div key={section.id} className="p-6">
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center">
                  <div className="mr-3 p-2 rounded-lg bg-indigo-50">
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                </div>
                {activeSection === section.id ? (
                  <FiChevronUp className="text-gray-400" />
                ) : (
                  <FiChevronDown className="text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {activeSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-4 pl-14">
                      {section.fields.map((field) => (
                        <div key={field.field} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="sm:w-1/3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {field.label}
                            </label>
                            {field.description && (
                              <p className="text-xs text-gray-500">{field.description}</p>
                            )}
                          </div>
                          <div className="sm:w-2/3">
                            {field.type === 'toggle' ? (
                              <div className="flex items-center justify-end sm:justify-start">
                                <ToggleSwitch
                                  enabled={isEditing ? tempSettings[section.id][field.field] : field.value}
                                  setEnabled={(val) => handleInputChange(section.id, field.field, val)}
                                />
                              </div>
                            ) : field.type === 'select' ? (
                              <select
                                value={isEditing ? tempSettings[section.id][field.field] : field.value}
                                onChange={(e) => handleInputChange(section.id, field.field, e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                                disabled={!isEditing}
                              >
                                {field.options.map((option) => (
                                  <option key={option} value={option}>
                                    {option} {field.unit && `(${field.unit})`}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type={field.type}
                                value={isEditing ? tempSettings[section.id][field.field] : field.value}
                                onChange={(e) => handleInputChange(section.id, field.field, e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                                disabled={!isEditing}
                              />
                            )}
                          </div>
                        </div>
                      ))}

                      <div className="flex justify-end gap-3 pt-4">
                        {!isEditing ? (
                          <button
                            onClick={() => startEditing(section.id)}
                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                          >
                            Edit
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={cancelEditing}
                              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={saveChanges}
                              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                              Save Changes
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Login Sessions Section */}
          <div className="p-6">
            <button
              onClick={() => toggleSection('sessions')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center">
                <div className="mr-3 p-2 rounded-lg bg-indigo-50">
                  <FiClock className="text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Login Sessions</h3>
              </div>
              {activeSection === 'sessions' ? (
                <FiChevronUp className="text-gray-400" />
              ) : (
                <FiChevronDown className="text-gray-400" />
              )}
            </button>

            <AnimatePresence>
              {activeSection === 'sessions' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pl-14">
                    <div className="mb-6 h-64 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                      <Suspense fallback={<div className="flex items-center justify-center h-full">Loading map...</div>}>
                        <LoginLocationMap locations={loginSessions} />
                      </Suspense>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-800">Active Sessions</h4>
                      {loginSessions.map((session) => (
                        <div key={session.id} className={`p-4 rounded-lg border ${session.current ? 'border-indigo-200 bg-indigo-50' : 'border-gray-200'}`}>
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center">
                                <p className="font-medium text-gray-800">{session.device}</p>
                                {session.current && (
                                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-800">
                                    Current Session
                                  </span>
                                )}
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <FiMapPin className="mr-1.5" />
                                <span>{session.location}</span>
                                <span className="mx-2">•</span>
                                <span>{session.ip}</span>
                              </div>
                              <div className="mt-1 flex items-center text-sm text-gray-500">
                                <FiClock className="mr-1.5" />
                                <span>{formatDate(session.time)}</span>
                              </div>
                            </div>
                            {!session.current && (
                              <button 
                                onClick={() => terminateSession(session.id)}
                                className="flex items-center text-sm text-red-600 hover:text-red-800"
                              >
                                <FiLogOut className="mr-1" />
                                Terminate
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-6 bg-red-50 border-t border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-red-800">Danger Zone</h3>
              <p className="text-sm text-red-600">These actions are irreversible</p>
            </div>
            <div className="space-x-3">
              <button className="px-4 py-2 bg-white border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors">
                Deactivate Account
              </button>
              <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;