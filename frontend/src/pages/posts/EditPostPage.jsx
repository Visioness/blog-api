import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsApi } from '../../lib/api';
import PostForm from '../../components/posts/PostForm';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import FormError from '../../components/ui/FormError';
import { Edit2 } from 'lucide-react';

const EditPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postsApi.getById(postId);
        setPost(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (formData) => {
    setSaving(true);
    setError('');

    try {
      await postsApi.update(postId, formData);
      navigate(`/posts/${postId}`);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/posts/${postId}`);
  };

  if (loading) {
    return (
      <div className='flex justify-center py-20'>
        <LoadingSpinner size='lg' />
      </div>
    );
  }

  if (!post) {
    return (
      <div className='max-w-3xl mx-auto px-4 py-20 text-center'>
        <h2 className='text-2xl font-bold text-zinc-100 mb-4'>
          Post Not Found
        </h2>
        <p className='text-zinc-500'>
          {error || 'The post you are looking for does not exist.'}
        </p>
      </div>
    );
  }

  return (
    <div className='h-full overflow-y-auto scrollbar-thin'>
      <div className='max-w-3xl mx-auto px-4 py-8'>
        <Card>
          <Card.Header>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-lg bg-emerald-600/10 text-emerald-500'>
                <Edit2 size={24} />
              </div>
              <div>
                <h1 className='text-2xl font-bold text-zinc-100'>Edit Post</h1>
                <p className='text-zinc-500 text-sm'>
                  Update your post content
                </p>
              </div>
            </div>
          </Card.Header>

          <Card.Body>
            <FormError error={error} />
            {error && <div className='mb-6' />}

            <PostForm
              initialData={{ title: post.title, content: post.content }}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              loading={saving}
              submitLabel='Save Changes'
            />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default EditPostPage;
