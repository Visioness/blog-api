import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsApi } from '../../lib/api';
import PostForm from '../../components/posts/PostForm';
import Card from '../../components/ui/Card';
import FormError from '../../components/ui/FormError';
import { PenLine } from 'lucide-react';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      const data = await postsApi.create(formData);
      navigate(`/posts/${data.data.id}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className='h-full overflow-y-auto scrollbar-thin'>
      <div className='max-w-3xl mx-auto px-4 py-8'>
        <Card>
          <Card.Header>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-lg bg-emerald-600/10 text-emerald-500'>
                <PenLine size={24} />
              </div>
              <div>
                <h1 className='text-2xl font-bold text-zinc-100'>
                  Create New Post
                </h1>
                <p className='text-zinc-500 text-sm'>
                  Share your knowledge with the community
                </p>
              </div>
            </div>
          </Card.Header>

          <Card.Body>
            <FormError error={error} />
            {error && <div className='mb-6' />}

            <PostForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              loading={loading}
              submitLabel='Create Post'
            />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default CreatePostPage;
