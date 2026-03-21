import 'package:flutter/material.dart';
import 'package:campus_social/theme/app_theme.dart';
import 'package:campus_social/modules/profile/auth_service.dart';
import 'package:campus_social/modules/feed/social_feed_home_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool _isLoading = false;
  bool _obscurePassword = true;

  void _handleLogin() async {
    setState(() => _isLoading = true);
    final success = await authService.login(_emailController.text, _passwordController.text);
    setState(() => _isLoading = false);

    if (success) {
      if (mounted) {
        Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (context) => const SocialFeedHomeScreen()),
          (route) => false,
        );
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
            const SizedBox(height: 40),
            Text(
              'Welcome Back 👋',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.w900,
                color: isDark ? Colors.white : const Color(0xFF1B4D3E),
                letterSpacing: -1,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Sign in to your account with your university email.',
              style: TextStyle(color: Colors.grey[500], fontSize: 16),
            ),
            const SizedBox(height: 48),
            _buildTextField(
              controller: _emailController,
              label: 'University Email',
              hint: 'e.g. j.smith@scu.edu',
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
              obscure: _obscurePassword,
              onToggle: () => setState(() => _obscurePassword = !_obscurePassword),
            ),
            const SizedBox(height: 16),
            Align(
              alignment: Alignment.centerRight,
              child: TextButton(
                onPressed: () {},
                child: Text('Forgot Password?', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),
              ),
            ),
            const SizedBox(height: 40),
            _buildSubmitButton(),
            const SizedBox(height: 24),
            _buildSocialLogin(isDark),
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
    bool obscure = false,
    VoidCallback? onToggle,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label.toUpperCase(), style: TextStyle(color: Colors.grey[600], fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 0.5)),
        const SizedBox(height: 10),
        TextField(
          controller: controller,
          obscureText: obscure,
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: TextStyle(color: Colors.grey[400], fontSize: 14),
            prefixIcon: Icon(icon, color: Colors.grey[400], size: 20),
            suffixIcon: isPassword 
              ? IconButton(icon: Icon(obscure ? Icons.visibility_off : Icons.visibility, color: Colors.grey[400], size: 20), onPressed: onToggle) 
              : null,
            filled: true,
            fillColor: isDark ? Colors.white12 : (Colors.grey[50] ?? Colors.white).withValues(alpha: 0.8),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
          ),
          style: const TextStyle(fontSize: 16),
        ),
      ],
    );
  }

  Widget _buildSubmitButton() {
    return ElevatedButton(
      onPressed: _isLoading ? null : _handleLogin,
      style: ElevatedButton.styleFrom(
        backgroundColor: AppTheme.primary,
        foregroundColor: Colors.white,
        minimumSize: const Size(double.infinity, 56),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        elevation: 0,
        disabledBackgroundColor: Colors.grey[300],
      ),
      child: _isLoading 
        ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) 
        : const Text('Sign In', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
    );
  }

  Widget _buildSocialLogin(bool isDark) {
    return Column(
      children: [
        Row(
          children: [
            Expanded(child: Divider(color: Colors.grey[200])),
            Padding(padding: const EdgeInsets.symmetric(horizontal: 16), child: Text('or continue with', style: TextStyle(color: Colors.grey[400], fontSize: 12))),
            Expanded(child: Divider(color: Colors.grey[200])),
          ],
        ),
        const SizedBox(height: 32),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _socialButton(Icons.apple, isDark),
            _socialButton(Icons.g_mobiledata, isDark),
            _socialButton(Icons.facebook, isDark),
          ],
        ),
      ],
    );
  }

  Widget _socialButton(IconData icon, bool isDark) {
    return Container(
      width: 80,
      height: 56,
      decoration: BoxDecoration(
        color: isDark ? Colors.white10 : Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.black.withValues(alpha: 0.05)),
      ),
      child: Icon(icon, size: 28, color: isDark ? Colors.white : Colors.black87),
    );
  }
}
