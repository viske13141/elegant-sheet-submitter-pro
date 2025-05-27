
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Moon, Sun, Send, Check, User, Phone, Mail, Building, MapPin, Briefcase } from 'lucide-react';

interface FormData {
  name: string;
  mobile: string;
  email: string;
  department: string;
  role: string;
  address: string;
}

const UserForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    email: '',
    department: '',
    role: '',
    address: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    
    if (!formData.name.trim()) {
      toast({ title: "Error", description: "Name is required", variant: "destructive" });
      return false;
    }
    if (!phoneRegex.test(formData.mobile)) {
      toast({ title: "Error", description: "Please enter a valid 10-digit mobile number", variant: "destructive" });
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast({ title: "Error", description: "Please enter a valid email address", variant: "destructive" });
      return false;
    }
    if (!formData.department.trim()) {
      toast({ title: "Error", description: "Department is required", variant: "destructive" });
      return false;
    }
    if (!formData.role.trim()) {
      toast({ title: "Error", description: "Role is required", variant: "destructive" });
      return false;
    }
    if (!formData.address.trim()) {
      toast({ title: "Error", description: "Address is required", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      setShowConfirmModal(true);
    }
  };

  const handleSend = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://sheetdb.io/api/v1/7gy6ue89nrnhs', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          mobile_number: formData.mobile,
          company_email: formData.email,
          department: formData.department,
          role: formData.role,
          current_address: formData.address,
          submission_date: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your details have been submitted successfully.",
        });
        setFormData({
          name: '',
          mobile: '',
          email: '',
          department: '',
          role: '',
          address: ''
        });
        setShowConfirmModal(false);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your details. Please try again.",
        variant: "destructive",
      });
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="sm"
            className="hover-scale transition-all duration-300 hover:shadow-lg"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Main Form Card */}
        <Card className="max-w-2xl mx-auto shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fade-in">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              User Registration Form
            </CardTitle>
            <p className="text-muted-foreground">Please fill in your details below</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2 group">
              <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4 text-blue-500" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="hover-scale transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            {/* Mobile Field */}
            <div className="space-y-2 group">
              <Label htmlFor="mobile" className="flex items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4 text-green-500" />
                Mobile Number
              </Label>
              <Input
                id="mobile"
                type="tel"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                className="hover-scale transition-all duration-300 focus:ring-2 focus:ring-green-500"
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2 group">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                <Mail className="h-4 w-4 text-purple-500" />
                Company Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="hover-scale transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your company email"
              />
            </div>

            {/* Department Field */}
            <div className="space-y-2 group">
              <Label htmlFor="department" className="flex items-center gap-2 text-sm font-medium">
                <Building className="h-4 w-4 text-orange-500" />
                Department
              </Label>
              <Input
                id="department"
                type="text"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="hover-scale transition-all duration-300 focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your department"
              />
            </div>

            {/* Role Field */}
            <div className="space-y-2 group">
              <Label htmlFor="role" className="flex items-center gap-2 text-sm font-medium">
                <Briefcase className="h-4 w-4 text-red-500" />
                Role/Position
              </Label>
              <Input
                id="role"
                type="text"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="hover-scale transition-all duration-300 focus:ring-2 focus:ring-red-500"
                placeholder="Enter your role/position"
              />
            </div>

            {/* Address Field */}
            <div className="space-y-2 group">
              <Label htmlFor="address" className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-teal-500" />
                Current Address
              </Label>
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="hover-scale transition-all duration-300 focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your current address"
              />
            </div>

            {/* Confirm Button */}
            <Button
              onClick={handleConfirm}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover-scale"
            >
              <Check className="h-5 w-5 mr-2" />
              Confirm Details
            </Button>
          </CardContent>
        </Card>

        {/* Confirmation Modal */}
        <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
          <DialogContent className="max-w-md mx-auto animate-scale-in">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center">
                Confirm Your Details
              </DialogTitle>
              <DialogDescription className="text-center">
                Please review your information before submitting
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span className="text-muted-foreground">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Mobile:</span>
                  <span className="text-muted-foreground">{formData.mobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span className="text-muted-foreground">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Department:</span>
                  <span className="text-muted-foreground">{formData.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Role:</span>
                  <span className="text-muted-foreground">{formData.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Address:</span>
                  <span className="text-muted-foreground text-right">{formData.address}</span>
                </div>
              </div>
              
              <Button
                onClick={handleSend}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserForm;
