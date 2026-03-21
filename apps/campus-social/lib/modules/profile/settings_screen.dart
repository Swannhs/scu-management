import 'package:flutter/material.dart';
import 'package:campus_social/theme/app_theme.dart';
import 'package:campus_social/components/navigation/bottom_nav.dart';
import 'package:campus_social/modules/profile/auth_service.dart';
import 'package:campus_social/modules/profile/account_settings_screen.dart';

class SettingsScreen extends StatefulWidget {

  const SettingsScreen({super.key});

  @override

  State<SettingsScreen> createState() => _SettingsScreenState();

}

class _SettingsScreenState extends State<SettingsScreen> {

  bool _isDarkMode = false;

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      appBar: AppBar(

        title: const Text('Settings', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24)),

        actions: [

          IconButton(icon: const Icon(Icons.search), onPressed: () {}),

        ],

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.all(16.0),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              // Profile Summary

              Container(

                padding: const EdgeInsets.all(16),

                decoration: BoxDecoration(

                  color: isDark ? const Color(0xFF1E293B) : Colors.white,

                  borderRadius: BorderRadius.circular(16),

                  border: Border.all(color: Colors.grey.withOpacity(0.1)),

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

                    Stack(

                      children: [

                        const CircleAvatar(

                          radius: 32,

                          backgroundImage: NetworkImage('https://lh3.googleusercontent.com/aida-public/AB6AXuBOvgUksffT3dp5lBTLIAWevwm8PRoX89SlTzHSvd83rVtJFkXVxXN-d64TAdlHw0QNr-h35nND4zUmUlqIZoDsvRAcGrxMlB25qAKUaGsJSLFrbvUcgqB8mcU5hVhRy8weU2wK0p6wqVV-OIs2Mid8-1rk9aRD6dvc3g8GELHzPobtlVechd7NFKmcN7H6EvzwnS_sQk9VGaXO7SXNKX_gjWezRt3_n8gJcw2E5jpxFy1-VJSSR4RkAgavS25a_IbUUAJ-vjNTM8mD'),

                        ),

                        Positioned(

                          bottom: 0,

                          right: 0,

                          child: Container(

                            width: 14,

                            height: 14,

                            decoration: BoxDecoration(

                              color: AppTheme.primary,

                              shape: BoxShape.circle,

                              border: Border.all(color: isDark ? const Color(0xFF1E293B) : Colors.white, width: 2),

                            ),

                          ),

                        ),

                      ],

                    ),

                    const SizedBox(width: 16),

                    const Expanded(

                      child: Column(

                        crossAxisAlignment: CrossAxisAlignment.start,

                        children: [

                          Text('Alex Rivera', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

                          Text('Computer Science, Senior', style: TextStyle(color: Colors.grey, fontSize: 13)),

                        ],

                      ),

                    ),

                    TextButton(

                      onPressed: () {},

                      style: TextButton.styleFrom(

                         backgroundColor: AppTheme.primary.withOpacity(0.1),

                         foregroundColor: AppTheme.primary,

                         shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),

                      ),

                      child: const Text('Edit', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),

                    ),

                  ],

                ),

              ),

              const SizedBox(height: 32),

              const Text('GENERAL', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Colors.grey, letterSpacing: 1.2)),

              const SizedBox(height: 12),

              _SettingsGroup(

                children: [

                   _SettingsTile(
                    icon: Icons.person_outline,
                    title: 'Account',
                    onTap: () => Navigator.pushNamed(context, '/account-settings'),
                  ),

                   _SettingsTile(

                    icon: Icons.lock_outline,

                    title: 'Privacy & Security',

                    onTap: () {},

                  ),

                   _SettingsTile(

                    icon: Icons.notifications_none,

                    title: 'Notifications',

                    badge: '3',

                    onTap: () {},

                  ),

                ],

              ),

              const SizedBox(height: 32),

              const Text('PREFERENCES', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Colors.grey, letterSpacing: 1.2)),

              const SizedBox(height: 12),

              _SettingsGroup(

                children: [

                   _SettingsSwitchTile(

                    icon: Icons.dark_mode_outlined,

                    title: 'Dark Mode',

                    value: _isDarkMode,

                    onChanged: (val) => setState(() => _isDarkMode = val),

                  ),

                   _SettingsTile(

                    icon: Icons.translate,

                    title: 'Language',

                    trailingText: 'English (US)',

                    onTap: () {},

                  ),

                ],

              ),

               const SizedBox(height: 32),

              const Text('SUPPORT', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Colors.grey, letterSpacing: 1.2)),

              const SizedBox(height: 12),

              _SettingsGroup(

                children: [

                   _SettingsTile(

                    icon: Icons.help_outline,

                    title: 'Help & Support',

                    onTap: () {},

                  ),

                   _SettingsTile(
                    icon: Icons.logout,
                    title: 'Logout',
                    titleColor: Colors.redAccent,
                    iconColor: Colors.redAccent,
                    onTap: () async {
                      await authService.logout();
                      if (mounted) {
                        Navigator.pushNamedAndRemoveUntil(context, '/onboarding', (route) => false);
                      }
                    },
                    showChevron: false,
                  ),

                ],

              ),

              const SizedBox(height: 48),

              Center(

                child: Column(

                  children: [

                    const Text('Version 2.4.1 (Build 829)', style: TextStyle(fontSize: 11, color: Colors.grey)),

                    const SizedBox(height: 4),

                    const Text('© 2024 Campus Social Inc.', style: TextStyle(fontSize: 9, color: Colors.grey)),

                  ],

                ),

              ),

               const SizedBox(height: 32),

            ],

          ),

        ),

      ),

       bottomNavigationBar: const BottomNav(currentIndex: 4),

    );

  }

}

class _SettingsGroup extends StatelessWidget {

  final List<Widget> children;

  const _SettingsGroup({required this.children});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(

      decoration: BoxDecoration(

        color: isDark ? const Color(0xFF1E293B) : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: Colors.grey.withOpacity(0.1)),

      ),

      child: Column(

        children: List.generate(children.length * 2 - 1, (index) {

          if (index.isOdd) return Divider(height: 1, color: Colors.grey.withOpacity(0.05), indent: 56);

          return children[index ~/ 2];

        }),

      ),

    );

  }

}

class _SettingsTile extends StatelessWidget {

  final IconData icon;

  final String title;

  final String? badge;

  final String? trailingText;

  final VoidCallback onTap;

  final Color? titleColor;

  final Color? iconColor;

  final bool showChevron;

  const _SettingsTile({

    required this.icon,

    required this.title,

    this.badge,

    this.trailingText,

    required this.onTap,

    this.titleColor,

    this.iconColor,

    this.showChevron = true,

  });

  @override

  Widget build(BuildContext context) {

    return ListTile(

      onTap: onTap,

      leading: Container(

        padding: const EdgeInsets.all(8),

        decoration: BoxDecoration(

          color: (iconColor ?? AppTheme.primary).withOpacity(0.1),

          borderRadius: BorderRadius.circular(10),

        ),

        child: Icon(icon, color: iconColor ?? AppTheme.primary, size: 20),

      ),

      title: Text(title, style: TextStyle(fontWeight: FontWeight.w500, fontSize: 15, color: titleColor)),

      trailing: Row(

        mainAxisSize: MainAxisSize.min,

        children: [

          if (badge != null)

             Container(

              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),

              decoration: BoxDecoration(color: AppTheme.primary, borderRadius: BorderRadius.circular(10)),

              child: Text(badge!, style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),

            ),

          if (trailingText != null)

             Text(trailingText!, style: const TextStyle(color: Colors.grey, fontSize: 13)),

          if (showChevron)

            const Icon(Icons.chevron_right, size: 20, color: Colors.grey),

        ],

      ),

    );

  }

}

class _SettingsSwitchTile extends StatelessWidget {

  final IconData icon;

  final String title;

  final bool value;

  final ValueChanged<bool> onChanged;

  const _SettingsSwitchTile({

    required this.icon,

    required this.title,

    required this.value,

    required this.onChanged,

  });

  @override

  Widget build(BuildContext context) {

    return ListTile(

      leading: Container(

        padding: const EdgeInsets.all(8),

        decoration: BoxDecoration(

          color: AppTheme.primary.withOpacity(0.1),

          borderRadius: BorderRadius.circular(10),

        ),

        child: Icon(icon, color: AppTheme.primary, size: 20),

      ),

      title: Text(title, style: const TextStyle(fontWeight: FontWeight.w500, fontSize: 15)),

      trailing: Switch.adaptive(

        value: value,

        onChanged: onChanged,

        activeColor: AppTheme.primary,

      ),

    );

  }

}
