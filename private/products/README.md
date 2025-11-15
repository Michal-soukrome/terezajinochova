# 🔒 Private Products Directory

This directory contains the actual digital products (PDFs) that customers purchase.

## Security

✅ **This directory is NOT publicly accessible**

- Files are served only through `/api/download` route
- Requires valid Stripe session ID
- Download links expire after 30 days
- All access attempts are logged

❌ **DO NOT** put these files in `public/products/`

- Public directory is directly accessible via URL
- Anyone could download without paying

## File Naming Convention

Use the naming pattern defined in `lib/products.ts`:

```
svatebni-denik-basic-v1.pdf      (for basic product)
svatebni-denik-premium-v1.pdf    (for premium product)
```

Version numbers allow you to update products without breaking old download links.

## Adding New Products

1. Add PDF to this directory: `private/products/your-product-v1.pdf`
2. Update `lib/products.ts`:
   ```typescript
   {
     id: "new-product",
     pdfFile: "your-product-v1.pdf",
     // ... other fields
   }
   ```
3. Create Stripe Price object
4. Run `npm run verify-prices` to validate

## Local Development

Make sure this directory exists:

```bash
mkdir -p private/products
```

Add sample PDFs for testing (they can be dummy files):

```bash
echo "Sample basic product" > private/products/svatebni-denik-basic-v1.pdf
echo "Sample premium product" > private/products/svatebni-denik-premium-v1.pdf
```

## Production Deployment

Vercel and most hosting platforms preserve the directory structure, including `private/`.

**Important:** Ensure `.gitignore` includes the actual PDF files but not the directory:

```
# .gitignore
private/products/*.pdf
!private/products/.gitkeep
```

This way:

- ✅ Directory structure is committed
- ❌ Actual PDFs are NOT committed (add manually to production)

## Testing Download Flow

1. Complete a test purchase in Stripe test mode
2. Get the session ID from success URL
3. Try downloading: `https://your-domain.com/api/download?session=cs_test_xxx`
4. Verify:
   - File downloads successfully
   - Correct product is served
   - Expired sessions are rejected
   - Unpaid sessions are rejected

## Troubleshooting

**"Product file not available" error:**

- Check file exists in `private/products/`
- Check filename matches exactly in `lib/products.ts`
- Check file permissions (should be readable)

**"Download link expired" error:**

- Purchase is older than 30 days
- This is expected behavior
- Customer should contact support for reactivation

**"Payment not completed" error:**

- Session payment_status is not 'paid'
- User abandoned checkout or payment failed
- This is expected behavior
