import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsLogoutDialogOpen(false);
  };

  return (
    <>
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold">Quizo</Link>
            </div>
            <div className="flex items-center gap-4">
              <span>Welcome, {user?.username}</span>
              <Button 
                variant="outline" 
                onClick={() => setIsLogoutDialogOpen(true)}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl">Logout</DialogTitle>
            <DialogDescription className="text-base">
              Are you sure you want to logout? You will need to login again to access your quizzes.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 gap-2">
            <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar; 