import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthUser from '../hooks/useAuthUser'
import { completeOnboarding } from '../lib/api';
import { toast } from 'react-toastify'
import { useState } from 'react';
import { CameraIcon, ShuffleIcon } from 'lucide-react';

const Onboarding = () => {
  const { isLoading, authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    larningLanguage: authUser?.larningLanguage || "",
    loaction: authUser?.loaction || "",
    profilePic: authUser?.profilePic || ""
  })

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success('Profile onboarded successfully');
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  }

  const handleRandomAvatar = () => {

  }

  return (
    <div className='max-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete Your Profile</h1>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* PROFILE PIC CONTAINER */}
            <div className='flex flex-col items-center justify-center space-y-4'>
              {/* IMAGE PREVIEW */}
              <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                {formState.profilePic ? (
                  <img src={formState.profilePic} alt="Profile Preview" className='w-full h-full object-cover' />
                ) : (
                  <div className='flex items-center justify-center h-full'>
                    <CameraIcon className='size-12 text-base-content opacity-40' />
                  </div>
                )}
              </div>
              {/* GENERATE RANDOM AVATAR BTN */}
              <div className='flex items-center gap-2'>
                <button type='button' onClick={handleRandomAvatar} className='btn btn-accent'>
                  <ShuffleIcon className='size-4 mr-2' />
                  Generate Random Avatar
                </button>
              </div>
            </div>

            {/* FULL NAME */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Full Name</span>
              </label>
              <input type="text" placeholder='Full Name' name='fullName' value={formState.fullName} onChange={(e) => setFormState({ ...formState, fullName: e.target.value })} className='input input-bordered w-full focus:outline-none focus:border-primary/25' />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Bio</span>
              </label>
              <textarea name="bio" value={formState.bio} onChange={(e) => setFormState({ ...formState, bio: e.target.value })} className='textarea textarea-bordered h-24' placeholder='Tell others about yourself and your language learning goals'></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Onboarding