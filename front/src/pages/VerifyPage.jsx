import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { API_URL } from '../js/api';

function VerifyPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setError('Verification token is missing');
      return;
    }

    fetch(`${API_URL}/api/auth/verify?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setStatus('error');
          setError(data.error);
        } else {
          setStatus('success');
        }
      })
      .catch(() => {
        setStatus('error');
        setError('Something went wrong');
      });
  }, [searchParams]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body text-center">
              {status === 'loading' && <p>Verifying your email...</p>}

              {status === 'success' && (
                <>
                  <h2 className="text-success mb-3">Email Verified!</h2>
                  <p>Your email has been successfully verified.</p>
                  <Link to="/login" className="btn btn-primary">
                    Go to Login
                  </Link>
                </>
              )}

              {status === 'error' && (
                <>
                  <h2 className="text-danger mb-3">Verification Failed</h2>
                  <p>{error}</p>
                  <Link to="/register" className="btn btn-primary">
                    Try Again
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyPage;
