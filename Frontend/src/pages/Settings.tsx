import React, { useRef, useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockUsers } from '../data/mockData';
import { 
  Bell, 
  Lock, 
  UserCircle, 
  Mail,
  Save,
  AwardIcon
} from 'lucide-react';
import Badge from '../components/ui/Badge';
import { useRecoilValue } from 'recoil';
import { IsLoading, UserDetails } from '../State/ComponetState';
import { BACKEND_URL } from '../config';

const Settings: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const EmailRef = useRef<HTMLInputElement>(null);
  const [displayname , SetDisplayname ] = useState("")
  const BioRef = useRef<HTMLInputElement>(null);
  const UserDetail = useRecoilValue(UserDetails);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isLoading = useRecoilValue(IsLoading)
  //Spliting The Value

  const [preview, setPreview] = useState<string | null>(null);
  const user = mockUsers[0];
  const [settings, setSettings] = useState({
    notifications: {
      messages: true,
      mentions: true,
      updates: false,
      newsletter: true,
    },
    privacy: {
      showEmail: user.privacySettings.showEmail,
      showActivity: user.privacySettings.showActivity,
      allowDirectMessages: user.privacySettings.allowDirectMessages,
      shareJournals: user.privacySettings.shareJournals,
    },
    theme: 'light',
    language: 'en',
  });

  const handleNotificationChange = (key: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handlePrivacyChange = (key: keyof typeof settings.privacy) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key],
      },
    }));
  };

    const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleButtonClick = () => {
  fileInputRef.current?.click(); 
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${BACKEND_URL}/api/v1/media/upload`, {
        method: 'POST',
        headers: {
          token: localStorage.getItem('token') || '',
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert('Image uploaded!');
        console.log(data.imageUrl); 
      } else {
        alert('Upload failed');
      }
    }
  };
  const UpdateDetails = async()=>{
    try{
      console.log(displayname);
      const Arr = displayname?.split(" ");
      const Res = await fetch(`${BACKEND_URL}/api/v1/user/updateuserdetails` , {
        method : "POST",
        headers : {
          token : localStorage.getItem('token') || "",
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          email : EmailRef.current?.value,
          bio : BioRef.current?.value,
          firstname : Arr[0],
          lastname : Arr[1]
        })
      })
      if(Res.ok){
        alert("Profile Updated")
      }else{
        alert("Error While Updating")
      }

    }catch(e){
      console.log(e);
      alert("Internal Error")
    }

  }


  const AddTageUser = async()=>{
    const Resposne = await fetch(`${BACKEND_URL}/api/v1/main/addusertag`, {
      method : "POST",
      headers : {
        token : localStorage.getItem('token') || '',
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        tag : JSON.stringify(tags.map(e => e))
      })
    })
    if(Resposne.ok){
      alert("Added Tags")
    }else{
      alert("Unable To Add The Tags")
    }
  }
    if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="space-y-6">
          {/* Profile Settings Skeleton */}
          <Card className="animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                <div className="flex items-center">
                  <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
                  <div className="h-10 w-24 bg-gray-200 rounded ml-4"></div>
                </div>
              </div>
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
              <div>
                <div className="h-4 w-16 bg-gray-200 rounded mb-1"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </Card>

          {/* Notification Settings Skeleton */}
          <Card className="animate-pulse">
            <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-6 w-11 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          </Card>

          {/* Privacy Settings Skeleton */}
          <Card className="animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <div className="h-4 w-28 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 w-36 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-6 w-11 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          </Card>

          {/* Account Settings Skeleton */}
          <Card className="animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
              <div>
                <div className="h-4 w-20 bg-gray-200 rounded mb-1"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
              <div>
                <div className="h-4 w-16 bg-gray-200 rounded mb-1"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </Card>

          {/* Save Button Skeleton */}
          <div className="flex justify-end">
            <div className="h-12 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card className="animate-fade-in">
          <h2 className="flex items-center text-lg font-semibold mb-4">
            <UserCircle className="mr-2 h-5 w-5 text-primary" />
            Profile Settings
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture
              </label>
              <div className="flex items-center">
                <img
                  src={UserDetail.avatar}
                  alt={user.name}
                  className="h-16 w-16 rounded-full"
                />             
                <Button variant="outline" className="ml-4" onClick={handleButtonClick}>
                  Change Photo
                </Button>
                <input
                    name="image"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
                
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                defaultValue={`${UserDetail.firstname} ${UserDetail.latname}`}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                onChange={(e)=> SetDisplayname(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                defaultValue={UserDetail.bio}
                rows={3}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                ref={BioRef}
              />
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (optional)
                </label>
                <div className="flex items-center mb-2">
                    <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                    placeholder="Add a tag (e.g., work, family)"
                    className="flex-1 rounded-l-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-primary focus:ring-primary"
                    />
                    <button
                    onClick={handleAddTag}
                    className="rounded-r-lg bg-primary px-4 py-2 text-white hover:bg-primary-dark"
                    >
                    Add
                    </button>
                    <button
                    onClick={AddTageUser}
                    className="rounded-r-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800 ml-4"
                    >
                    Save Tag
                    </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                    <Badge key={tag} variant="gray" className="flex items-center gap-1">
                        {tag}
                        <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 rounded-full text-gray-500 hover:text-gray-700"
                        >
                        &times;
                        </button>
                    </Badge>
                    ))}
                </div>
        </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="animate-fade-in">
          <h2 className="flex items-center text-lg font-semibold mb-4">
            <Bell className="mr-2 h-5 w-5 text-primary" />
            Notification Settings
          </h2>
          
          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Receive notifications for {key}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleNotificationChange(key as keyof typeof settings.notifications)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="animate-fade-in">
          <h2 className="flex items-center text-lg font-semibold mb-4">
            <Lock className="mr-2 h-5 w-5 text-primary" />
            Privacy Settings
          </h2>
          
          <div className="space-y-4">
            {Object.entries(settings.privacy).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Control who can see your {key.toLowerCase()}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handlePrivacyChange(key as keyof typeof settings.privacy)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>

        {/* Account Settings */}
        <Card className="animate-fade-in">
          <h2 className="flex items-center text-lg font-semibold mb-4">
            <Mail className="mr-2 h-5 w-5 text-primary" />
            Account Settings
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={UserDetail.email}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                ref={EmailRef}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            size="lg"
            leftIcon={<Save className="h-5 w-5" />}
            onClick={UpdateDetails}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;