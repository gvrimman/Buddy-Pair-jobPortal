import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from "../../utils/axios";

function AcceptReferral() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const trackReferral = async () => {
      const referralCode = searchParams.get('code');
      if (!referralCode) {
        setMessage('Invalid referral link.');
        setStatus('error');
        return;
      }

      try {
        const response = await axios.post('referral/track', { referralCode });
        setMessage(response.data.message);
        setStatus('success');
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || 'An error occurred while tracking the referral.';
        setMessage(errorMessage);
        setStatus('error');
      }
    };

    trackReferral();
  }, [searchParams]);

  return (
    <div className="max-w-[900px] w-full flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">
          {status === 'success' ? 'Referral Accepted!' : 'Referral Failed'}
        </h1>
        <p
          className={`mt-4 text-center ${
            status === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
        <a
          href="/job-portal"
          className="mt-6 block px-6 py-2 bg-purple-500 text-white text-center rounded hover:bg-purple-600"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
}

export default AcceptReferral;
