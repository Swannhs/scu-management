
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class NotificationsScreen extends StatelessWidget {

  const NotificationsScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      appBar: AppBar(

        leading: IconButton(

          icon: const Icon(Icons.arrow_back),

          onPressed: () {},

        ),

        title: const Text('Notifications', style: TextStyle(fontWeight: FontWeight.bold)),

        actions: [

          TextButton(

             onPressed: () {},

             child: const Text('Mark all as read', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 13)),

          ),

        ],

      ),

      body: Column(

        children: [

          // Filter Tabs

          Container(

             decoration: BoxDecoration(

              border: Border(bottom: BorderSide(color: Colors.grey.withOpacity(0.1))),

            ),

            child: Row(

              mainAxisAlignment: MainAxisAlignment.spaceAround,

              children: [

                _NotifTab(label: 'All', isActive: true),

                _NotifTab(label: 'Requests'),

                _NotifTab(label: 'Mentions'),

              ],

            ),

          ),

          Expanded(

            child: ListView(

               children: [

                // Today Section

                 Container(

                   width: double.infinity,

                   padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

                   color: AppTheme.primary.withOpacity(0.05),

                   child: const Text('TODAY', style: TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.2)),

                 ),

                 const _NotificationItem(

                  user: 'Alex Rivers',

                  action: 'sent you a friend request',

                  time: '2 minutes ago',

                  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCokklM4QTUPSt-hnvO3sWldcVr9ffyrYeoEDDqLpUrwScbZ_Xpgxb5mLnnBDZ0rjohd61hBNBc3Wy3EqyyiuyE8r3d7iP82Hr0k12xBLNg2x1LJuAhE-WbWI8WAWu_68bXlFfIX_fM2gAABRdweiKSfz1blpObMtqlvlw_fglN_g3d8jef7Aji-NSUc-YhS7Lw4ra-mlbkbwRgI_dWv-W-xVhHYUKEgcWBxpTL2jLRU4lRQH11AZbno76m3-eHeFW6tE0A9EZ1R6h5',

                   icon: Icons.person_add,

                   iconColor: AppTheme.primary,

                   isUnread: true,

                    hasButtons: true,

                ),

                 const _NotificationItem(

                  user: 'Sarah Chen',

                  action: 'loved your photo in ',

                   extra: 'Campus Life 2024',

                  time: '15 minutes ago',

                  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZyccGgl7hpjFkG55lN3sATSYcR-3W4eYUOAoheahSYcJgVQxzfsZuNn68-teRJ2We8zFBXAxQB6PomDjJaLXAlpuKXYikb_WfOfJAKoIgH7D-q66JXfIoH-5IrOrUmwh6GpXkYXxZFua9xd9nzfbacPqgasDGt0P_ZIr7W24LK04cAPT8vGFl8giS2NFmqF3eK-wlztND9IGlN-K4lDQ42fD-elyFg7ABM65wnmSMj2Do_bhJGRwUIbaChL0qs9z0irjTWoGs3lDo',

                   icon: Icons.favorite,

                   iconColor: Colors.redAccent,

                   isUnread: true,

                ),

                 const _NotificationItem(

                  user: 'Marcus Thorne',

                  action: 'invited you to join ',

                   extra: 'Green Tech Innovation Hub',

                  time: '1 hour ago',

                  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBA3v73bhJFZ9E7jeoJPYqhcMC0s29f8A8IAX1cy5ETX4A0L8wJhGTwuC6YsVHl81Ovpay6Y57udbjXi5-LjvdeeWNdDTD0kMwLnaDgLGB2D2tdA7QCE63zJIOldn1S6t_HhmHskEwFbBO-JBX2HsX7OLnpyLYXd1ZFHI3q-u82zYaKCXIOX3AQpFcYvhL4zZrA0M4Qiq-DVuRW217WX4ChlJ2FuKLE6cN02w6B9GWq6CSEQ3VcXgn12SF2nSl_1P9QuuRkKUx_kY7Q',

                   icon: Icons.groups,

                   iconColor: Colors.amber,

                   hasInviteButton: true,

                ),

                 // Yesterday Section

                 Container(

                   width: double.infinity,

                   padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

                   color: AppTheme.primary.withOpacity(0.05),

                   child: const Text('YESTERDAY', style: TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.2)),

                 ),

                 const _NotificationItem(

                  user: 'Elena Grace',

                   action: 'commented on your post: "This is exactly what the student council was talking about!"',

                  time: 'Yesterday, 4:32 PM',

                  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfU9magMcssZB030ibX4TAs5iLfso_KvgY8E4Hcch_Xmf7JYoiUDU0U2m6tfA3D993K2-CHBg7kRf9M1kyJDR8y4LudxbGTq6kVHykjS3feodtBHAH82ekhga6Gi1CJ9350RxV_ErTurauYm3mcCGMPfdm-rXPlm5q_boJENKuvykQLjucA08M2I45yBhWq3gbFxCfdYSmrMmFjYvmFlVcUHMCCSfyi4UJVQ6EkX6eKCiiQ1sIqqFDB6YMJGDrytu3XLAd-10qfYhl',

                   icon: Icons.chat_bubble,

                   iconColor: Colors.blueAccent,

                   isRead: true,

                ),

                 const _NotificationItem(

                  user: 'Design Department',

                   action: 'New announcement in Group: Mid-term portfolio reviews schedule released.',

                  time: 'Yesterday, 11:15 AM',

                   isLogo: true,

                   icon: Icons.campaign,

                   iconColor: AppTheme.primary,

                   isRead: true,

                ),

                 const SizedBox(height: 100),

               ],

            ),

          ),

        ],

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 3), // Activity is index 3

    );

  }

}

class _NotifTab extends StatelessWidget {

  final String label;

  final bool isActive;

  const _NotifTab({required this.label, this.isActive = false});

  @override

  Widget build(BuildContext context) {

    return Container(

      padding: const EdgeInsets.symmetric(vertical: 16.0),

      decoration: BoxDecoration(

        border: isActive ? const Border(bottom: BorderSide(color: AppTheme.primary, width: 2)) : null,

      ),

      child: Text(

        label,

        style: TextStyle(

          fontSize: 14,

          fontWeight: isActive ? FontWeight.bold : FontWeight.w600,

          color: isActive ? AppTheme.primary : Colors.grey,

        ),

      ),

    );

  }

}

class _NotificationItem extends StatelessWidget {

  final String user;

  final String action;

  final String? extra;

  final String time;

  final String? imageUrl;

  final IconData icon;

  final Color iconColor;

  final bool isUnread;

  final bool isRead;

  final bool hasButtons;

  final bool hasInviteButton;

  final bool isLogo;

  const _NotificationItem({

    required this.user,

    required this.action,

    this.extra,

    required this.time,

    this.imageUrl,

    required this.icon,

    required this.iconColor,

    this.isUnread = false,

    this.isRead = false,

    this.hasButtons = false,

    this.hasInviteButton = false,

    this.isLogo = false,

  });

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isUnread ? AppTheme.primary.withOpacity(0.02) : Colors.transparent,

        border: Border(bottom: BorderSide(color: Colors.grey.withOpacity(0.05))),

      ),

      child: Row(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

           Stack(

            children: [

               if (isLogo)

                 Container(

                  width: 48,

                  height: 48,

                  decoration: BoxDecoration(

                    color: AppTheme.primary.withOpacity(0.1),

                    shape: BoxShape.circle,

                    border: Border.all(color: Colors.white, width: 2),

                  ),

                  child: Icon(icon, color: AppTheme.primary, size: 24),

                )

               else

                  CircleAvatar(

                    radius: 24,

                    backgroundImage: NetworkImage(imageUrl!),

                  ),

              Positioned(

                bottom: -2,

                right: -2,

                child: Container(

                  padding: const EdgeInsets.all(2),

                  decoration: BoxDecoration(

                     color: iconColor,

                    shape: BoxShape.circle,

                    border: Border.all(color: Theme.of(context).scaffoldBackgroundColor, width: 2),

                  ),

                  child: Icon(icon, color: Colors.white, size: 10),

                ),

              ),

            ],

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                RichText(

                  text: TextSpan(

                    style: TextStyle(

                      fontSize: 14,

                       color: isDark ? Colors.white : Colors.black87,

                      height: 1.4,

                    ),

                    children: [

                      TextSpan(text: user, style: const TextStyle(fontWeight: FontWeight.bold)),

                      const TextSpan(text: ' '),

                      TextSpan(text: action),

                      if (extra != null)

                        TextSpan(text: extra!, style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),

                    ],

                  ),

                ),

                const SizedBox(height: 4),

                Text(time, style: const TextStyle(fontSize: 11, color: Colors.grey)),

                if (hasButtons) ...[

                   const SizedBox(height: 12),

                   Row(

                    children: [

                      Expanded(

                        child: ElevatedButton(

                          onPressed: () {},

                          child: const Text('Accept'),

                           style: ElevatedButton.styleFrom(

                            backgroundColor: AppTheme.primary,

                            foregroundColor: Colors.white,

                            elevation: 0,

                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),

                             minimumSize: const Size(0, 36),

                          ),

                        ),

                      ),

                      const SizedBox(width: 8),

                      Expanded(

                        child: ElevatedButton(

                          onPressed: () {},

                          child: const Text('Decline'),

                           style: ElevatedButton.styleFrom(

                            backgroundColor: AppTheme.primary.withOpacity(0.1),

                            foregroundColor: AppTheme.primary,

                            elevation: 0,

                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),

                             minimumSize: const Size(0, 36),

                          ),

                        ),

                      ),

                    ],

                   ),

                ],

                if (hasInviteButton) ...[

                   const SizedBox(height: 12),

                   SizedBox(

                      width: double.infinity,

                      child: ElevatedButton(

                        onPressed: () {},

                        child: const Text('View Invite'),

                        style: ElevatedButton.styleFrom(

                          backgroundColor: AppTheme.primary.withOpacity(0.1),

                          foregroundColor: AppTheme.primary,

                          elevation: 0,

                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),

                          minimumSize: const Size(0, 36),

                        ),

                      ),

                   ),

                ],

              ],

            ),

          ),

          if (isUnread) ...[

            const SizedBox(width: 12),

             Container(

              width: 8,

              height: 8,

              margin: const EdgeInsets.only(top: 10),

              decoration: BoxDecoration(color: AppTheme.primary, shape: BoxShape.circle),

            ),

          ],

        ],

      ),

    );

  }

}
