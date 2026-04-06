import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SecretLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('bodify_guest_mode', '1');
    // Set minimal guest settings so onboarding is skipped
    const guestSettings = {
      name: 'Guest',
      age: 25,
      height: 175,
      weight: 70,
      gender: 'other',
      activityLevel: 'moderate',
      goal: 'maintain',
      fitnessLevel: 'intermediate',
      daysPerWeek: 4,
      onboardingCompleted: true,
    };
    localStorage.setItem('userSettings', JSON.stringify(guestSettings));
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
};

export default SecretLogin;
