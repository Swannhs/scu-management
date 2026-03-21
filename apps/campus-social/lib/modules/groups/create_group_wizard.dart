
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class CreateGroupWizardScreen extends StatefulWidget {

  const CreateGroupWizardScreen({super.key});

  @override

  State<CreateGroupWizardScreen> createState() => _CreateGroupWizardScreenState();

}

class _CreateGroupWizardScreenState extends State<CreateGroupWizardScreen> {

  int _currentStep = 1;

  bool _isPublic = true;

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: SafeArea(

        child: Column(

          children: [

            _buildHeader(context, isDark),

            _buildProgressIndicator(),

            Expanded(

              child: SingleChildScrollView(

                padding: const EdgeInsets.all(24),

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    const Text(

                      'Group Details',

                      style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),

                    ),

                    const SizedBox(height: 4),

                    Text(

                      'Step $_currentStep of 4: Basic Information',

                      style: TextStyle(color: Colors.grey[500], fontSize: 13),

                    ),

                    const SizedBox(height: 32),

                    _buildInputField('Group Name', 'Enter your campus group name', isDark),

                    const SizedBox(height: 24),

                    _buildInputField('Description', 'What is this group about? (e.g. goals, activities)', isDark, isTextArea: true),

                    const SizedBox(height: 24),

                    _buildPrivacyToggle(isDark),

                    const SizedBox(height: 24),

                    _buildCoverPhotoSection(isDark),

                    const SizedBox(height: 40),

                  ],

                ),

              ),

            ),

            _buildFooter(context),

          ],

        ),

      ),

    );

  }

  Widget _buildHeader(BuildContext context, bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

      child: Row(

        children: [

          IconButton(

            icon: const Icon(Icons.arrow_back),

            onPressed: () => Navigator.pop(context),

          ),

          const Expanded(

            child: Text(

              'Create New Group',

              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildProgressIndicator() {

    return Padding(

      padding: const EdgeInsets.symmetric(vertical: 20),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.center,

        children: List.generate(4, (index) {

          bool isActive = index < _currentStep;

          return Container(

            margin: const EdgeInsets.symmetric(horizontal: 4),

            width: 8,

            height: 8,

            decoration: BoxDecoration(

              color: isActive ? AppTheme.primary : AppTheme.primary.withOpacity(0.2),

              shape: BoxShape.circle,

            ),

          );

        }),

      ),

    );

  }

  Widget _buildInputField(String label, String placeholder, bool isDark, {bool isTextArea = false}) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Text(

          label,

          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),

        ),

        const SizedBox(height: 8),

        TextField(

          maxLines: isTextArea ? 4 : 1,

          decoration: InputDecoration(

            hintText: placeholder,

            hintStyle: TextStyle(color: Colors.grey[500], fontSize: 14),

            filled: true,

            fillColor: isDark ? Color(0xFF1E293B)?.withOpacity(0.5) : Colors.white,

            border: OutlineInputBorder(

              borderRadius: BorderRadius.circular(12),

              borderSide: BorderSide(color: AppTheme.primary.withOpacity(0.1)),

            ),

            enabledBorder: OutlineInputBorder(

              borderRadius: BorderRadius.circular(12),

              borderSide: BorderSide(color: AppTheme.primary.withOpacity(0.1)),

            ),

            focusedBorder: OutlineInputBorder(

              borderRadius: BorderRadius.circular(12),

              borderSide: const BorderSide(color: AppTheme.primary),

            ),

            contentPadding: const EdgeInsets.all(16),

          ),

        ),

      ],

    );

  }

  Widget _buildPrivacyToggle(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        const Text(

          'Privacy Settings',

          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),

        ),

        const SizedBox(height: 12),

        Row(

          children: [

            Expanded(

              child: _PrivacyCard(

                title: 'Public',

                desc: 'Anyone can join and see posts',

                icon: Icons.public,

                isSelected: _isPublic,

                onTap: () => setState(() => _isPublic = true),

                isDark: isDark,

              ),

            ),

            const SizedBox(width: 12),

            Expanded(

              child: _PrivacyCard(

                title: 'Private',

                desc: 'Approval required to join',

                icon: Icons.lock_outline,

                isSelected: !_isPublic,

                onTap: () => setState(() => _isPublic = false),

                isDark: isDark,

              ),

            ),

          ],

        ),

      ],

    );

  }

  Widget _buildCoverPhotoSection(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        const Text(

          'Cover Photo',

          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),

        ),

        const SizedBox(height: 12),

        Container(

          width: double.infinity,

          height: 160,

          decoration: BoxDecoration(

            color: AppTheme.primary.withOpacity(0.05),

            borderRadius: BorderRadius.circular(16),

            border: Border.all(color: AppTheme.primary.withOpacity(0.3), width: 2, style: BorderStyle.solid),

          ),

          child: Column(

            mainAxisAlignment: MainAxisAlignment.center,

            children: [

              const Icon(Icons.add_a_photo_outlined, color: AppTheme.primary, size: 40),

              const SizedBox(height: 8),

              const Text(

                'Upload Group Cover',

                style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 14),

              ),

              Text(

                'Recommended size: 1200x675',

                style: TextStyle(color: Colors.grey[500], fontSize: 11),

              ),

            ],

          ),

        ),

      ],

    );

  }

  Widget _buildFooter(BuildContext context) {

    return Container(

      padding: const EdgeInsets.fromLTRB(24, 0, 24, 40),

      child: ElevatedButton(

        onPressed: () {

          if (_currentStep < 4) {

            setState(() => _currentStep++);

          } else {

            Navigator.pop(context);

          }

        },

        style: ElevatedButton.styleFrom(

          backgroundColor: AppTheme.primary,

          foregroundColor: Colors.white,

          minimumSize: const Size(double.infinity, 56),

          shape: const StadiumBorder(),

          elevation: 4,

          shadowColor: AppTheme.primary.withOpacity(0.3),

        ),

        child: Row(

          mainAxisAlignment: MainAxisAlignment.center,

          children: [

            Text(_currentStep < 4 ? 'Continue' : 'Finish', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

            const SizedBox(width: 8),

            const Icon(Icons.arrow_forward, size: 20),

          ],

        ),

      ),

    );

  }

}

class _PrivacyCard extends StatelessWidget {

  final String title;

  final String desc;

  final IconData icon;

  final bool isSelected;

  final VoidCallback onTap;

  final bool isDark;

  const _PrivacyCard({

    required this.title,

    required this.desc,

    required this.icon,

    required this.isSelected,

    required this.onTap,

    required this.isDark,

  });

  @override

  Widget build(BuildContext context) {

    return GestureDetector(

      onTap: onTap,

      child: Container(

        padding: const EdgeInsets.all(16),

        decoration: BoxDecoration(

          color: isSelected ? AppTheme.primary.withOpacity(0.05) : (isDark ? Color(0xFF1E293B)?.withOpacity(0.5) : Colors.white),

          borderRadius: BorderRadius.circular(16),

          border: Border.all(

            color: isSelected ? AppTheme.primary : AppTheme.primary.withOpacity(0.1),

            width: isSelected ? 2 : 1,

          ),

        ),

        child: Column(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            Icon(icon, color: isSelected ? AppTheme.primary : Colors.grey[400], size: 24),

            const SizedBox(height: 12),

            Text(

              title,

              style: TextStyle(

                fontWeight: FontWeight.bold,

                fontSize: 14,

                color: isSelected ? AppTheme.primary : (isDark ? Colors.white : Colors.black87),

              ),

            ),

            const SizedBox(height: 4),

            Text(

              desc,

              style: TextStyle(

                color: Colors.grey[500],

                fontSize: 10,

              ),

            ),

          ],

        ),

      ),

    );

  }

}
