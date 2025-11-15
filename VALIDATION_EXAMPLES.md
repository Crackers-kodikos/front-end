# Validation Examples & Recipes

## Common Patterns

### 1. Simple Contact Form

```jsx
import { useFormValidation, validationRules } from '../hooks/useFormValidation'
import FormInput from '../component/FormInput'

export default function ContactForm() {
  const form = useFormValidation(
    {
      name: '',
      email: '',
      message: ''
    },
    async (values) => {
      // Send to API
      console.log('Sending:', values)
    },
    {
      name: [
        validationRules.required('Name is required'),
        validationRules.minLength(3)
      ],
      email: [
        validationRules.required('Email is required'),
        validationRules.email('Invalid email address')
      ],
      message: [
        validationRules.required('Message is required'),
        validationRules.minLength(10, 'Message must be at least 10 characters')
      ]
    }
  )

  return (
    <form onSubmit={form.handleSubmit}>
      <FormInput
        label="Name"
        name="name"
        value={form.values.name}
        error={form.errors.name}
        touched={form.touched.name}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        required
      />

      <FormInput
        label="Email"
        name="email"
        type="email"
        value={form.values.email}
        error={form.errors.email}
        touched={form.touched.email}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        required
      />

      <FormInput
        label="Message"
        name="message"
        value={form.values.message}
        error={form.errors.message}
        touched={form.touched.message}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        required
      />

      <button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  )
}
```

### 2. Product Form with Optional Fields

```jsx
const form = useFormValidation(
  { 
    name: '', 
    price: '', 
    description: '',
    sku: '' 
  },
  handleSubmit,
  {
    name: [
      validationRules.required('Product name required'),
      validationRules.maxLength(100)
    ],
    price: [
      validationRules.required('Price required'),
      validationRules.number('Price must be a number'),
      validationRules.minValue(0, 'Price cannot be negative')
    ],
    description: [] // Optional - no validation
  }
)
```

### 3. Password Form with Matching

Create a custom validation rule for matching passwords:

```jsx
// In your form component
const form = useFormValidation(
  { password: '', confirmPassword: '' },
  handleSubmit,
  {
    password: [
      validationRules.required('Password required'),
      validationRules.minLength(8, 'Password must be at least 8 characters')
    ],
    confirmPassword: [
      validationRules.required('Please confirm password'),
      (value) => value !== form.values.password ? 'Passwords do not match' : null
    ]
  }
)
```

### 4. Date Range Validation

```jsx
const form = useFormValidation(
  { startDate: '', endDate: '' },
  handleSubmit,
  {
    startDate: [
      validationRules.required('Start date required')
    ],
    endDate: [
      validationRules.required('End date required'),
      (value) => {
        if (form.values.startDate && new Date(value) <= new Date(form.values.startDate)) {
          return 'End date must be after start date'
        }
        return null
      }
    ]
  }
)
```

### 5. File Upload Form

```jsx
export default function FileForm() {
  const form = useFormValidation(
    { file: null, filename: '' },
    handleSubmit,
    {
      filename: [
        validationRules.required('Filename required')
      ]
    }
  )

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File too large. Maximum 5MB.')
        return
      }
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (!validTypes.includes(file.type)) {
        alert('Invalid file type. Must be JPG, PNG, or GIF.')
        return
      }
      form.setFieldValue('file', file)
    }
  }

  return (
    <form onSubmit={form.handleSubmit}>
      <FormInput
        label="Filename"
        name="filename"
        value={form.values.filename}
        error={form.errors.filename}
        touched={form.touched.filename}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        required
      />

      <input 
        type="file" 
        onChange={handleFileChange}
        accept="image/*"
      />
      {form.values.file && <p>File: {form.values.file.name}</p>}

      <button type="submit">Upload</button>
    </form>
  )
}
```

### 6. Delete with Confirmation

```jsx
import DeleteConfirmModal from '../component/DeleteConfirmModal'

export default function ProductCard({ product }) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteProduct(product.id)
      // Navigate away or refresh list
    } catch (error) {
      alert('Failed to delete')
    } finally {
      setIsDeleting(false)
      setConfirmOpen(false)
    }
  }

  return (
    <>
      <div className="product-card">
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <button onClick={() => setConfirmOpen(true)}>Delete</button>
      </div>

      <DeleteConfirmModal
        open={confirmOpen}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        itemName={product.name}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </>
  )
}
```

### 7. Dynamic Field Validation

```jsx
// Show different validation based on user type
const form = useFormValidation(
  { userType: 'personal', businessName: '', taxId: '' },
  handleSubmit,
  {
    userType: [
      validationRules.required('User type required')
    ],
    businessName: [
      // Only required if userType is 'business'
      (value) => {
        if (form.values.userType === 'business' && !value) {
          return 'Business name required'
        }
        return null
      }
    ],
    taxId: [
      // Only required if userType is 'business'
      (value) => {
        if (form.values.userType === 'business' && !value) {
          return 'Tax ID required'
        }
        return null
      }
    ]
  }
)
```

### 8. Email Uniqueness Check (Async)

```jsx
const form = useFormValidation(
  { email: '' },
  handleSubmit,
  {
    email: [
      validationRules.required('Email required'),
      validationRules.email('Invalid email')
    ]
  }
)

// Check uniqueness on blur
const handleEmailBlur = async (e) => {
  form.handleBlur(e)
  
  if (!form.errors.email && form.values.email) {
    try {
      const exists = await checkEmailExists(form.values.email)
      if (exists) {
        form.setFieldError('email', 'Email already registered')
      }
    } catch (error) {
      console.error('Error checking email:', error)
    }
  }
}
```

### 9. Multi-Step Form with Validation

```jsx
export default function MultiStepForm() {
  const [step, setStep] = useState(1)

  const form = useFormValidation(
    { 
      // Step 1
      name: '',
      email: '',
      // Step 2
      phone: '',
      address: '',
      // Step 3
      password: '',
      confirmPassword: ''
    },
    handleSubmit,
    {
      // Validate current step
      ...(step === 1 && {
        name: [validationRules.required()],
        email: [validationRules.required(), validationRules.email()]
      }),
      ...(step === 2 && {
        phone: [validationRules.required(), validationRules.phone()],
        address: [validationRules.required()]
      }),
      ...(step === 3 && {
        password: [validationRules.required(), validationRules.minLength(8)],
        confirmPassword: [validationRules.required()]
      })
    }
  )

  const canProceed = () => {
    return Object.keys(form.errors).length === 0
  }

  const handleNext = async () => {
    // Mark current fields as touched to show errors
    if (step === 1) {
      form.setValues({ ...form.values })
    }
    if (canProceed()) {
      setStep(step + 1)
    }
  }

  return (
    <div>
      {step === 1 && (
        <>
          <FormInput name="name" label="Name" {...formProps} />
          <FormInput name="email" label="Email" type="email" {...formProps} />
          <button onClick={handleNext}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <FormInput name="phone" label="Phone" {...formProps} />
          <FormInput name="address" label="Address" {...formProps} />
          <button onClick={() => setStep(1)}>Back</button>
          <button onClick={handleNext}>Next</button>
        </>
      )}

      {step === 3 && (
        <>
          <FormInput name="password" label="Password" type="password" {...formProps} />
          <FormInput name="confirmPassword" label="Confirm" type="password" {...formProps} />
          <button onClick={() => setStep(2)}>Back</button>
          <button onClick={form.handleSubmit}>Submit</button>
        </>
      )}
    </div>
  )
}
```

### 10. Form with Array Fields (Components)

```jsx
export default function ProductForm() {
  const form = useFormValidation(
    { 
      name: '',
      components: [
        { id: 1, name: 'Component 1', price: 100 }
      ]
    },
    handleSubmit,
    {
      name: [validationRules.required()]
    }
  )

  const addComponent = () => {
    const newComponent = {
      id: Date.now(),
      name: '',
      price: ''
    }
    form.setFieldValue('components', [
      ...form.values.components,
      newComponent
    ])
  }

  const updateComponent = (id, field, value) => {
    form.setFieldValue('components', 
      form.values.components.map(c => 
        c.id === id ? { ...c, [field]: value } : c
      )
    )
  }

  const removeComponent = (id) => {
    form.setFieldValue('components',
      form.values.components.filter(c => c.id !== id)
    )
  }

  return (
    <form onSubmit={form.handleSubmit}>
      <FormInput
        name="name"
        label="Product"
        value={form.values.name}
        {...form}
      />

      <div>
        <h3>Components</h3>
        {form.values.components.map(comp => (
          <div key={comp.id}>
            <input
              value={comp.name}
              onChange={(e) => updateComponent(comp.id, 'name', e.target.value)}
              placeholder="Name"
            />
            <input
              value={comp.price}
              onChange={(e) => updateComponent(comp.id, 'price', e.target.value)}
              placeholder="Price"
            />
            <button onClick={() => removeComponent(comp.id)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addComponent}>Add Component</button>
      </div>

      <button type="submit">Save</button>
    </form>
  )
}
```

## Custom Validation Rules

```jsx
// Add these to validationRules in useFormValidation.js

// Username availability check
username: (message = 'Username already taken') => async (value) => {
  if (!value) return null
  const available = await checkUsernameAvailable(value)
  if (!available) return message
  return null
}

// Strong password
strongPassword: (message = 'Password must contain uppercase, lowercase, number, and special char') => (value) => {
  if (!value) return null
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value)) {
    return message
  }
  return null
}

// URL format
url: (message = 'Invalid URL') => (value) => {
  if (!value) return null
  try {
    new URL(value)
    return null
  } catch {
    return message
  }
}

// Credit card
creditCard: (message = 'Invalid credit card number') => (value) => {
  if (!value) return null
  // Luhn algorithm check
  const sanitized = value.replace(/\D/g, '')
  if (sanitized.length !== 16) return message
  // ... add Luhn validation ...
  return null
}
```

---

Use these patterns as templates for your forms! 🎯
