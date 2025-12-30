import { useState } from 'react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { Save, X } from 'lucide-react';

const PostForm = ({
  initialData = { title: '', content: '' },
  onSubmit,
  onCancel,
  loading = false,
  submitLabel = 'Save',
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 10) {
      newErrors.content = 'Content must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <Input
        label='Title'
        name='title'
        placeholder='Enter a compelling title...'
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
      />

      <TextArea
        label='Content'
        name='content'
        placeholder='Write your post content here...'
        value={formData.content}
        onChange={handleChange}
        rows={12}
        error={errors.content}
      />

      <div className='flex items-center gap-3 pt-4'>
        <Button type='submit' loading={loading}>
          <Save size={16} />
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type='button' variant='ghost' onClick={onCancel}>
            <X size={16} />
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default PostForm;
