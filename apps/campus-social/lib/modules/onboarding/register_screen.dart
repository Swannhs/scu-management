import 'package:flutter/material.dart';
import 'package:campus_social/theme/app_theme.dart';
import 'package:campus_social/modules/profile/auth_service.dart';
import 'package:campus_social/modules/onboarding/login_screen.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool _isLoading = false;
  bool _acceptTerms = false;

  void _handleRegister() async {
    if (!_acceptTerms) return;
    setState(() => _isLoading = true);
    final success = await authService.register(_nameController.text, _emailController.text, _passwordController.text);
    setState(() => _isLoading = false);

    if (success) {
      if (mounted) {
        Navigator.pop(context); // Go back to Login
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppTheme.backgroundDark : Colors.white,
      appBar: AppBar(backgroundColor: Colors.transparent, elevation: 0),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 24),
            Text(
              'Join Campus Social 🎓',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.w900,
                color: isDark ? Colors.white : const Color(0xFF1B4D3E),
                letterSpacing: -1,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Create an account to start your campus journey.',
              style: TextStyle(color: Colors.grey[500], fontSize: 16),
            ),
            const SizedBox(height: 40),
            _buildTextField(
              controller: _nameController,
              label: 'Full Name',
              hint: 'e.g. Elena Rodriguez',
              icon: Icons.person_outline,
              isDark: isDark,
            ),
            const SizedBox(height: 24),
            _buildTextField(
              controller: _emailController,
              label: 'University Email',
              hint: 'e.g. e.rod@scu.edu',
              icon: Icons.alternate_email,
              isDark: isDark,
            ),
            const SizedBox(height: 24),
            _buildTextField(
              controller: _passwordController,
              label: 'Password',
              hint: '••••••••',
              icon: Icons.lock_outline,
              isDark: isDark,
              isPassword: true,
            ),
            const SizedBox(height: 24),
            _buildTermsRow(),
            const SizedBox(height: 40),
            _buildSubmitButton(),
            const SizedBox(height: 24),
            _buildLoginPrompt(),
          ],
        ),
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    required String hint,
    required IconData icon,
    required bool isDark,
    bool isPassword = false,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label.toUpperCase(), style: TextStyle(color: Colors.grey[600], fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 0.5)),
        const SizedBox(height: 10),
        TextField(
          controller: controller,
          obscureText: isPassword,
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: TextStyle(color: Colors.grey[400], fontSize: 14),
            prefixIcon: Icon(icon, color: Colors.grey[400], size: 20),
            filled: true,
            fillColor: isDark ? Colors.white12 : (Colors.grey[50] ?? Colors.white).withValues(alpha: 0.8),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
          ),
          style: const TextStyle(fontSize: 16),
        ),
      ],
    );
  }

  Widget _buildTermsRow() {
    return Row(
      children: [
        Checkbox(
          value: _acceptTerms,
          onChanged: (value) => setState(() => _acceptTerms = value!),
          activeColor: AppTheme.primary,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
        ),
        Expanded(
          child: Text(
            'I agree to the Terms of Service and Privacy Policy',
            style: TextStyle(color: Colors.grey[500], fontSize: 12),
          ),
        ),
      ],
    );
  }

  Widget _buildSubmitButton() {
    return ElevatedButton(
      onPressed: _isLoading || !_acceptTerms ? null : _handleRegister,
      style: ElevatedButton.styleFrom(
        backgroundColor: AppTheme.primary,
        foregroundColor: Colors.white,
        minimumSize: const Size(double.infinity, 56),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        elevation: 0,
        disabledBackgroundColor: Colors.grey[200],
      ),
      child: _isLoading 
        ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) 
        : const Text('Create Account', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
    );
  }

  Widget _buildLoginPrompt() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text('Already have an account?', style: TextStyle(color: Colors.grey, fontSize: 13)),
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text(
            'Login',
            style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 13),
          ),
        ),
      ],
    );
  }
}
