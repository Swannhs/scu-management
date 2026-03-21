
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class BottomNav extends StatelessWidget {

  final int currentIndex;

  const BottomNav({

    super.key,

    required this.currentIndex,

  });

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(

      padding: const EdgeInsets.only(top: 8, bottom: 24, left: 16, right: 16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.backgroundDark.withOpacity(0.9) : Colors.white.withOpacity(0.9),

        border: Border(

          top: BorderSide(

            color: AppTheme.primary.withOpacity(0.1),

            width: 1,

          ),

        ),

      ),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          _NavItem(icon: Icons.home_filled, label: 'Feed', isActive: currentIndex == 0, route: '/home-feed'),
          _NavItem(icon: Icons.explore_outlined, label: 'Explore', isActive: currentIndex == 1, route: '/explore'),
          _NavItem(icon: Icons.school_outlined, label: 'Academic', isActive: currentIndex == 2, route: '/academic'),
          _NavItem(icon: Icons.chat_bubble_outline, label: 'Chat', isActive: currentIndex == 3, route: '/messaging'),
          _NavItem(icon: Icons.person_outline, label: 'Profile', isActive: currentIndex == 4, route: '/profile'),

        ],

      ),

    );

  }

}

class _NavItem extends StatelessWidget {

  final IconData icon;

  final String label;

  final bool isActive;

  final bool hasBadge;

  final String? route;

  const _NavItem({

    required this.icon,

    required this.label,

    required this.isActive,

    this.hasBadge = false,

    this.route,

  });

  @override

  Widget build(BuildContext context) {

    return GestureDetector(

      onTap: () {

        if (route != null && !isActive) {

          Navigator.pushNamed(context, route!);

        }

      },

      child: Column(

        mainAxisSize: MainAxisSize.min,

        children: [

          Stack(

            children: [

              Icon(

                icon,

                color: isActive ? AppTheme.primary : const Color(0xFF94A3B8),

                size: 24,

              ),

              if (hasBadge)

                Positioned(

                  top: 0,

                  right: 0,

                  child: Container(

                    width: 8,

                    height: 8,

                    decoration: BoxDecoration(

                      color: AppTheme.primary,

                      shape: BoxShape.circle,

                      border: Border.all(color: Colors.white, width: 2),

                    ),

                  ),

                ),

            ],

          ),

          const SizedBox(height: 4),

          Text(

            label,

            style: TextStyle(

              fontSize: 10,

              fontWeight: FontWeight.bold,

              color: isActive ? AppTheme.primary : const Color(0xFF94A3B8),

            ),

          ),

        ],

      ),

    );

  }

}
