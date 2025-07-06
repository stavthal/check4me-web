# Check4Me - Codebase Overview & User Guide

## 🚗 Application Overview

**Check4Me** is a comprehensive vehicle inspection platform that connects vehicle buyers with professional checkers for pre-purchase inspections. The application is built with Nuxt.js 3, Vue 3, TypeScript, and Supabase, featuring a modern, role-based architecture.

### Key Features

- **Multi-role Authentication**: Client, Checker, and Admin roles
- **Payment Processing**: Integrated Stripe payments with manual capture
- **Photo Management**: Secure photo upload and storage for inspection reports
- **Real-time Communication**: Request messaging system between clients and checkers
- **Blog System**: Content management for educational and marketing content
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS and Nuxt UI

## 🏗️ Architecture & Tech Stack

### Frontend

- **Framework**: Nuxt.js 3 with Vue 3 Composition API
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with Nuxt UI components
- **State Management**: Pinia for global state
- **Icons**: Lucide icons via Nuxt Icon

### Backend & Services

- **Database**: Supabase (PostgreSQL) with Row Level Security (RLS)
- **Authentication**: Supabase Auth with role-based access control
- **Storage**: Supabase Storage for photo uploads
- **Payments**: Stripe integration with manual capture
- **Real-time**: Supabase real-time subscriptions for messaging

### Development Tools

- **Package Manager**: Bun
- **Linting**: ESLint with Nuxt configuration
- **Testing**: Nuxt Test Utils
- **Validation**: Zod for form validation

## 🎯 User Roles & Permissions

### 1. **Client** (Vehicle Buyers)

- Create inspection requests
- Make payments for services
- View request status and progress
- Communicate with assigned checkers
- Review completed inspections
- View photo galleries of inspections

### 2. **Checker** (Vehicle Inspectors)

- View assigned inspection requests
- Upload photos during inspections
- Update request status (Complete, Approve, Reject)
- Communicate with clients
- Mark requests as completed

### 3. **Admin** (Platform Administrators)

- Manage payment processing and captures
- Create and manage blog content
- Access payment management dashboard
- Monitor platform activities

## 📊 Database Schema

### Core Tables

#### `users`

```sql
- id (UUID, PK) - References auth.users
- full_name (STRING)
- email (STRING)
- role (ENUM: 'client', 'checker', 'admin')
- area_id (BIGINT, FK to areas)
- created_at, updated_at (TIMESTAMP)
```

#### `areas`

```sql
- id (BIGINT, PK)
- name (STRING) - Geographic area name
```

#### `requests`

```sql
- id (BIGINT, PK)
- title (STRING)
- vehicle_make, vehicle_model (STRING)
- year (INTEGER)
- location (STRING)
- notes (TEXT)
- listing_link (STRING)
- status (ENUM: 'PENDING', 'APPROVED', 'REJECTED', 'COMPLETED')
- area_id (BIGINT, FK to areas)
- client_id (UUID, FK to auth.users)
- checker_id (UUID, FK to auth.users)
- payment_intent_id (STRING) - Stripe payment ID
- payment_status (STRING)
- created_at, updated_at (TIMESTAMP)
```

#### `request_photos`

```sql
- id (BIGINT, PK)
- request_id (BIGINT, FK to requests)
- photo_url (STRING)
- filename (STRING)
- uploaded_by (UUID, FK to auth.users)
- uploaded_at (TIMESTAMP)
- description (TEXT)
```

#### `request_messages`

```sql
- id (BIGINT, PK)
- request_id (BIGINT, FK to requests)
- sender_id (UUID, FK to auth.users)
- sender_type (ENUM: 'client', 'checker')
- message (TEXT)
- is_read (BOOLEAN)
- created_at (TIMESTAMP)
```

#### `reviews`

```sql
- id (BIGINT, PK)
- request_id (BIGINT, FK to requests)
- checker_id (UUID, FK to auth.users)
- client_id (UUID, FK to auth.users)
- rating (INTEGER)
- comment (TEXT)
- created_at (TIMESTAMP)
```

#### `blog_posts`

```sql
- id (BIGINT, PK)
- title (STRING)
- content (TEXT)
- excerpt (TEXT)
- slug (STRING, UNIQUE)
- author_id (UUID, FK to auth.users)
- published (BOOLEAN)
- created_at, updated_at (TIMESTAMP)
```

## 💰 Payment System

### Flow Overview

1. **Request Creation**: Client fills out inspection form
2. **Payment Modal**: Stripe payment form appears (€50 inspection fee)
3. **Payment Processing**: Stripe processes payment with manual capture
4. **Request Submission**: Request created with payment information
5. **Admin Capture**: Manual payment capture after service completion

### Key Features

- **Manual Capture**: Funds held until inspection completion
- **Secure Processing**: PCI-compliant Stripe Elements
- **Payment Metadata**: Request details stored in Stripe
- **Admin Dashboard**: Payment management interface

### API Endpoints

- `POST /api/stripe/create-payment-intent` - Create payment intent
- `POST /api/stripe/confirm-payment` - Confirm payment
- `GET /api/stripe/payment-intent/[id]` - Get payment details
- `POST /api/stripe/capture-payment` - Capture payment (admin)

## 📸 Photo Management

### Architecture

- **Storage**: Supabase Storage bucket (`request-photos`)
- **Organization**: Photos organized by request ID (`/request_id/timestamp.ext`)
- **Security**: RLS policies ensure only authorized access
- **Metadata**: Photo information stored in `request_photos` table

### Upload Flow

1. Checker opens request details modal
2. Clicks "Upload Photos" button
3. Selects files via file picker
4. Files uploaded to Supabase Storage
5. Metadata saved to database
6. Photos appear in request gallery

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Supabase account and project
- Stripe account (test/live keys)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd check-4-me

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase and Stripe keys

# Run development server
bun dev
```

### Environment Variables

```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 👥 User Guide

### For Clients (Vehicle Buyers)

#### 1. Registration & Login

1. Visit the application homepage
2. Click "Register" and select "Client" tab
3. Fill in personal details and select your area
4. Complete registration and login

#### 2. Creating an Inspection Request

1. Navigate to your client dashboard
2. Click "Νέο αίτημα" (New Request)
3. Fill out the vehicle information form:
   - Title for your request
   - Vehicle make, model, and year
   - Location for inspection
   - Listing link (if available)
   - Additional notes
4. Select your area and preferred checker (if available)
5. Click submit to proceed to payment

#### 3. Payment Process

1. Payment modal will appear showing €50 inspection fee
2. Enter your credit card details securely
3. Confirm payment to submit your request
4. Payment is held until inspection completion

#### 4. Tracking Your Request

1. View request status on your dashboard
2. Monitor progress: Pending → Approved → Completed
3. Receive updates from your assigned checker
4. View uploaded inspection photos

#### 5. Communication

1. Open request details to access chat
2. Send messages to your checker
3. Receive real-time notifications
4. Ask questions about the inspection

#### 6. Review Process

1. After completion, submit a review
2. Rate your checker (1-5 stars)
3. Leave detailed feedback
4. Help improve service quality

### For Checkers (Vehicle Inspectors)

#### 1. Registration & Setup

1. Register as a "Checker" during signup
2. Select your operating area
3. Complete profile verification
4. Access checker dashboard

#### 2. Managing Requests

1. View assigned requests in your dashboard
2. See request details, client information, and vehicle specs
3. Filter requests by status
4. Communicate with clients through messaging

#### 3. Inspection Process

1. Accept assigned inspection requests
2. Coordinate with client for inspection time
3. Perform thorough vehicle inspection
4. Document findings with photos

#### 4. Photo Upload

1. Open request details modal
2. Click "Upload Photos" button
3. Select multiple photos from inspection
4. Add descriptions if needed
5. Upload to create inspection gallery

#### 5. Completing Requests

1. Upload all inspection photos
2. Communicate findings to client
3. Mark request as "Completed"
4. Submit final inspection report

### For Admins (Platform Management)

#### 1. Payment Management

1. Access admin payment dashboard at `/admin/payments`
2. Look up payments by Payment Intent ID
3. View payment details and metadata
4. Capture payments after successful inspections
5. Monitor payment status and transactions

#### 2. Blog Management

1. Access blog dashboard at `/admin/blog`
2. Create new blog posts with rich text editor
3. Manage drafts and published content
4. Edit existing posts
5. Delete outdated content

#### 3. Content Creation

1. Use markdown-supported editor
2. Generate SEO-friendly slugs
3. Preview posts before publishing
4. Schedule content publication

## 🔧 Key Composables & Features

### Authentication

- `useHydrateUserStore()` - Global user state management
- `useLoginForm()` - Login functionality
- `useRegisterForm()` - Registration handling

### Request Management

- `useFetchClientRequests()` - Client request listing
- `useFetchCheckerRequests()` - Checker request management
- `useSubmitClientRequest()` - Request creation with payment
- `useUpdateRequestStatus()` - Status management

### Payment Integration

- `useStripePayment()` - Stripe payment processing
- Payment modal components
- Admin payment management

### Photo Management

- `usePhotoUpload()` - File upload functionality
- `usePhotoUrls()` - Secure URL generation
- Photo gallery components

### Communication

- `useRequestMessages()` - Real-time messaging
- Message threading and read status
- Real-time subscriptions

### Blog System

- `useCreateBlogPost()` - Content creation
- `useFetchBlogPosts()` - Content retrieval
- Rich text editor with preview

## 🔒 Security Features

### Authentication & Authorization

- Role-based access control (RBAC)
- Route protection middleware
- Supabase Auth integration

### Data Security

- Row Level Security (RLS) policies
- Secure API endpoints
- Environment variable protection

### Payment Security

- PCI-compliant Stripe integration
- Manual payment capture
- Secure payment metadata storage

### File Security

- Secure photo upload to Supabase Storage
- Access control policies
- Organized file structure

## 📱 Responsive Design

The application is fully responsive and works across:

- Desktop browsers
- Tablet devices
- Mobile phones
- Progressive Web App (PWA) capabilities

## 🚀 Deployment

### Production Build

```bash
# Build for production
bun run build

# Preview production build
bun run preview
```

### Environment Setup

1. Set up production Supabase project
2. Configure Stripe live keys
3. Set environment variables
4. Deploy to your preferred platform (Vercel, Netlify, etc.)

## 🐛 Troubleshooting

### Common Issues

#### Authentication Problems

- Check Supabase URL and keys
- Verify user role assignments
- Clear browser cache and cookies

#### Payment Issues

- Verify Stripe configuration
- Check payment intent status
- Review webhook configurations

#### Photo Upload Failures

- Confirm storage bucket setup
- Check RLS policies
- Verify file size limits

#### Database Errors

- Review RLS policies
- Check foreign key constraints
- Verify table permissions

## 🔄 Development Workflow

### Code Structure

```
components/          # Vue components organized by feature
├── Admin/          # Admin-specific components
├── Blog/           # Blog system components
├── CheckerRequests/# Checker workflow components
├── ClientRequests/ # Client workflow components
├── Form/           # Form components
├── Landing/        # Landing page components
└── Layout/         # Layout components

composables/        # Reusable composition functions
├── admin/          # Admin functionality
├── blog/           # Blog operations
├── checker/        # Checker operations
└── client/         # Client operations

pages/              # Route pages
├── admin/          # Admin routes
├── blog/           # Blog routes
├── dashboard/      # Dashboard routes
└── ...             # Other pages

server/             # Server-side API
└── api/            # API endpoints
    └── stripe/     # Stripe integration

types/              # TypeScript type definitions
stores/             # Pinia state stores
middleware/         # Route middleware
```

### Best Practices

- Use TypeScript for type safety
- Follow Vue 3 Composition API patterns
- Implement proper error handling
- Write reusable composables
- Use Zod for validation
- Follow security best practices

## 📈 Future Enhancements

### Planned Features

- Automatic payment capture on completion
- Advanced search and filtering
- Mobile app development
- Multi-language support
- Advanced analytics dashboard
- Integration with vehicle history services
- Automated report generation
- Enhanced messaging system

### Potential Improvements

- Performance optimizations
- Enhanced security measures
- Better error handling
- Improved user experience
- Advanced photo editing tools
- Integration with external APIs
- Enhanced admin capabilities

## 📞 Support

For technical support or questions:

1. Check the troubleshooting section
2. Review the documentation
3. Contact the development team
4. Submit issues through the project repository

---

This overview provides a comprehensive understanding of the Check4Me platform, its architecture, features, and usage. The application represents a modern, secure, and scalable solution for vehicle inspection services.
