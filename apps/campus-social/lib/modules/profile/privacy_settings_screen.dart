
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class PrivacySettingsScreen extends StatelessWidget {

  const PrivacySettingsScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      appBar: AppBar(

        leading: IconButton(

          icon: const Icon(Icons.arrow_back),

          onPressed: () {},

        ),

        title: const Text('Privacy & Security', style: TextStyle(fontWeight: FontWeight.bold)),

        centerTitle: true,

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.all(16.0),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              const Text('PRIVACY SETTINGS', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: AppTheme.primary, letterSpacing: 1.2)),

              const SizedBox(height: 12),

               _PrivacyTile(

                icon: Icons.visibility_outlined,

                title: 'Profile Visibility',

                subtitle: 'Manage who can see your campus activity',

              ),

              const SizedBox(height: 12),

               _PrivacyTile(

                icon: Icons.person_off_outlined,

                title: 'Blocked Users',

                subtitle: 'Review the list of restricted accounts',

              ),

               const SizedBox(height: 32),

              const Text('SECURITY & ACCESS', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: AppTheme.primary, letterSpacing: 1.2)),

              const SizedBox(height: 12),

               _PrivacyTile(

                icon: Icons.security_outlined,

                title: '2FA Status',

                subtitle: 'Extra layer of protection for your account',

                isBadge: true,

                badgeText: 'ACTIVE',

              ),

              const SizedBox(height: 12),

              _PrivacyTile(

                icon: Icons.devices_outlined,

                title: 'Login Activity',

                subtitle: 'See your active sessions and devices',

              ),

               const SizedBox(height: 32),

              const Text('DATA & STORAGE', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: AppTheme.primary, letterSpacing: 1.2)),

              const SizedBox(height: 12),

               _PrivacyTile(

                icon: Icons.data_usage_outlined,

                title: 'Data Usage',

                subtitle: 'Control image and video quality settings',

              ),

              const SizedBox(height: 12),

               _PrivacyTile(

                icon: Icons.download_for_offline_outlined,

                title: 'Your Data',

                subtitle: 'Download a copy of your campus history',

              ),

               const SizedBox(height: 48),

               SizedBox(

                 width: double.infinity,

                 child: OutlinedButton(

                    onPressed: () {},

                    child: const Text('Delete Account Permanently', style: TextStyle(color: Colors.redAccent, fontWeight: FontWeight.bold)),

                    style: OutlinedButton.styleFrom(

                      side: BorderSide(color: Colors.redAccent.withOpacity(0.3)),

                      padding: const EdgeInsets.symmetric(vertical: 20),

                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

                    ),

                 ),

               ),

               const SizedBox(height: 100),

            ],

          ),

        ),

      ),

    );

  }

}

class _PrivacyTile extends StatelessWidget {

  final IconData icon;

  final String title;

  final String subtitle;

  final bool isBadge;

  final String? badgeText;

  const _PrivacyTile({

    required this.icon,

    required this.title,

    required this.subtitle,

    this.isBadge = false,

    this.badgeText,

  });

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? const Color(0xFF1E293B) : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: AppTheme.primary.withOpacity(0.1)),

        boxShadow: [

           BoxShadow(

            color: Colors.black.withOpacity(0.02),

            blurRadius: 10,

            offset: const Offset(0, 4),

          ),

        ],

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.all(12),

            decoration: BoxDecoration(

              color: AppTheme.primary.withOpacity(0.1),

              borderRadius: BorderRadius.circular(12),

            ),

            child: Icon(icon, color: AppTheme.primary, size: 24),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Row(

                  children: [

                    Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),

                    if (isBadge) ...[

                      const SizedBox(width: 8),

                       Container(

                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 2),

                        decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.2), borderRadius: BorderRadius.circular(10)),

                        child: Text(badgeText!, style: const TextStyle(color: AppTheme.primary, fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 1.1)),

                      ),

                    ],

                  ],

                ),

                Text(subtitle, style: const TextStyle(fontSize: 11, color: Colors.grey)),

              ],

            ),

          ),

           const Icon(Icons.chevron_right, size: 20, color: Colors.grey),

        ],

      ),

    );

  }

}
