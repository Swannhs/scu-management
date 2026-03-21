
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class AccountSettingsScreen extends StatelessWidget {

  const AccountSettingsScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      appBar: AppBar(

        leading: IconButton(

          icon: const Icon(Icons.arrow_back),

          onPressed: () {},

        ),

        title: const Text('Account Settings', style: TextStyle(fontWeight: FontWeight.bold)),

        centerTitle: true,

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.all(16.0),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              const Text('PROFILE INFORMATION', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Colors.grey, letterSpacing: 1.2)),

              const SizedBox(height: 12),

              Container(

                 padding: const EdgeInsets.all(16),

                decoration: BoxDecoration(

                  color: isDark ? const Color(0xFF1E293B) : Colors.white,

                  borderRadius: BorderRadius.circular(16),

                  border: Border.all(color: Colors.grey.withOpacity(0.1)),

                ),

                child: Column(

                  children: [

                    Row(

                       children: [

                        const CircleAvatar(

                          radius: 32,

                           backgroundImage: NetworkImage('https://lh3.googleusercontent.com/aida-public/AB6AXuD7GBcZ-zeukyGhxfBd59olNyqxjYHxMe9hXCAL03iL740lG8oW2XjbZfuawVXXf982sCcTxit05whsw8GGJBIZP89N2dccwSLS8TppHWiZv3AVDpRa3NyQ4FwhwhiTDhAd7Q0VAr4g4bES2HudoSLYByjct-_j2iO3rpv6cuqj3EKReSAsQJQ-1Cds9fT5vIfm7BCrTBToclLRYdItr0zXhHbHP8_qm1FoThnIcQUix2gZb1zGQQ5wb9sfT6bkDaj6VNWZ4UvT3tQb'),

                        ),

                        const SizedBox(width: 16),

                        const Expanded(

                          child: Column(

                            crossAxisAlignment: CrossAxisAlignment.start,

                            children: [

                              Text('Alex Johnson', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

                              Text('alex.j@campus.edu', style: TextStyle(color: AppTheme.primary, fontSize: 13, fontWeight: FontWeight.w500)),

                            ],

                          ),

                        ),

                         IconButton(

                          icon: const Icon(Icons.edit_outlined, color: AppTheme.primary, size: 20),

                          onPressed: () {},

                          style: IconButton.styleFrom(backgroundColor: AppTheme.primary.withOpacity(0.1)),

                        ),

                      ],

                    ),

                    const Divider(height: 32),

                     const Align(

                      alignment: Alignment.centerLeft,

                      child: Column(

                        crossAxisAlignment: CrossAxisAlignment.start,

                        children: [

                          Text('BIO', style: TextStyle(fontSize: 9, color: Colors.grey, fontWeight: FontWeight.bold, letterSpacing: 1.1)),

                          SizedBox(height: 4),

                          Text('Computer Science \'24 | Coffee Lover | Hackathon Enthusiast. Always looking for new projects!', style: TextStyle(fontSize: 13, height: 1.6)),

                        ],

                      ),

                    ),

                  ],

                ),

              ),

              const SizedBox(height: 32),

              const Text('PASSWORD & SECURITY', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Colors.grey, letterSpacing: 1.2)),

              const SizedBox(height: 12),

               _AccountGroup(

                children: [

                   _AccountTile(

                    icon: Icons.lock_outline,

                    title: 'Change Password',

                  ),

                   _AccountTile(

                    icon: Icons.security_outlined,

                    title: 'Two-Factor Authentication',

                     trailing: 'On',

                  ),

                ],

               ),

               const SizedBox(height: 32),

              const Text('ACCOUNT MANAGEMENT', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Colors.grey, letterSpacing: 1.2)),

              const SizedBox(height: 12),

               _AccountGroup(

                children: [

                   _AccountTile(

                    icon: Icons.notifications_none,

                    title: 'Notifications',

                  ),

                   _AccountTile(

                    icon: Icons.visibility_outlined,

                    title: 'Privacy Settings',

                  ),

                   _AccountTile(

                    icon: Icons.logout,

                    title: 'Log Out',

                    titleColor: Colors.redAccent,

                    iconColor: Colors.redAccent,

                    showChevron: false,

                  ),

                ],

               ),

               const SizedBox(height: 100),

            ],

          ),

        ),

      ),

    );

  }

}

class _AccountGroup extends StatelessWidget {

  final List<Widget> children;

  const _AccountGroup({required this.children});

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

class _AccountTile extends StatelessWidget {

  final IconData icon;

  final String title;

  final String? trailing;

  final Color? titleColor;

  final Color? iconColor;

  final bool showChevron;

  const _AccountTile({

    required this.icon,

    required this.title,

    this.trailing,

    this.titleColor,

    this.iconColor,

    this.showChevron = true,

  });

  @override

  Widget build(BuildContext context) {

    return ListTile(

      leading: Container(

        padding: const EdgeInsets.all(8),

        decoration: BoxDecoration(

          color: (iconColor ?? AppTheme.primary).withOpacity(0.1),

          borderRadius: BorderRadius.circular(10),

        ),

        child: Icon(icon, color: iconColor ?? AppTheme.primary, size: 20),

      ),

      title: Text(title, style: TextStyle(fontWeight: FontWeight.w500, fontSize: 14, color: titleColor)),

      trailing: Row(

        mainAxisSize: MainAxisSize.min,

        children: [

          if (trailing != null)

             Text(trailing!, style: const TextStyle(color: Colors.grey, fontSize: 12)),

          if (showChevron)

            const Icon(Icons.chevron_right, size: 20, color: Colors.grey),

        ],

      ),

    );

  }

}
