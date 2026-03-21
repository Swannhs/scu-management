
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class MessagingListScreen extends StatelessWidget {

  const MessagingListScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      appBar: AppBar(

        title: Row(

          children: [

            Container(

              padding: const EdgeInsets.all(8),

              decoration: BoxDecoration(

                color: AppTheme.primary.withOpacity(0.1),

                borderRadius: BorderRadius.circular(8),

              ),

              child: const Icon(Icons.forum, color: AppTheme.primary, size: 20),

            ),

            const SizedBox(width: 12),

            const Text('Messages', style: TextStyle(fontWeight: FontWeight.bold)),

          ],

        ),

        actions: [

          IconButton(

            icon: const Icon(Icons.edit_square, size: 20),

            onPressed: () {},

          ),

        ],

      ),

      body: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          // Search Bar

          Padding(

            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),

            child: TextField(

              decoration: InputDecoration(

                filled: true,

                fillColor: isDark ? Color(0xFF64748B).withOpacity(0.1) : Color(0xFF64748B).withOpacity(0.05),

                prefixIcon: const Icon(Icons.search, color: Colors.grey),

                hintText: 'Search conversations...',

                hintStyle: const TextStyle(fontSize: 14, color: Colors.grey),

                border: OutlineInputBorder(

                  borderRadius: BorderRadius.circular(12),

                  borderSide: BorderSide.none,

                ),

                contentPadding: const EdgeInsets.symmetric(vertical: 12),

              ),

            ),

          ),

          // Active Now

          Padding(

            padding: EdgeInsets.fromLTRB(16, 16, 16, 8),

            child: Text(

              'ACTIVE NOW',

              style: TextStyle(

                fontSize: 10,

                fontWeight: FontWeight.bold,

                color: Colors.grey,

                letterSpacing: 1.2,

              ),

            ),

          ),

          SizedBox(

            height: 100,

            child: ListView(

              scrollDirection: Axis.horizontal,

              padding: const EdgeInsets.symmetric(horizontal: 16),

              children: const [

                _ActiveUser(name: 'Alex', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4I5Cc0yUOK3mL_GplxrhADsd9HqtL4dSuXqCuLpQTO7FqWZ-o6Gv6Sh8VoG0b_1JrpOI-sxsh5f3Aqz9DgBorSL-jUkyD70dETTF6fRdnoZr59u1u7ruJ6eybF9Yt-qB4OAunKDulc2kXKe11y9QNv7FrbGHdhqd6Uo8tCdpKxdqUIEK7IZzcQKGLlEc_3Alj5nBKcvsrfrkDb6Pet-a6Ij9sLw_AZA00YBkeIauMUGJ9S1CYhL_jUHjFe7BqHyUZhNPOOYinWm-y'),

                _ActiveUser(name: 'Sarah', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_C3EY9NeXc5JHLW0PdIx0qUnYE4QX-dZQYzgh1EEQzMmEvZje8NF5lMkx5Askk9gHgaHKQsPjAEXflwFKlQ2ZpZNM0c4ePiCR89DNUucs7EdCYUy4vXUPpmkTdCvAyLhDzrsjlfy6DyDnUCXQGhtSdP87h4tOgwD0Rm_f75yXvSpPCQOrlcJFbbA1oenNmeklMFkI9u-4DKcLRg_H4U13_416Cm7xEtLCj01PFlqcEPCyoEgcwaKFnxnr338s4AU74-VM-vKfrC0P'),

                _ActiveUser(name: 'Jordan', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbB78n0ytMrJ2LjC1dY7LbGVVYvwchywKH_SRV9dZ-aQWWkR4hFYYE5YF8jPi394cuFjGJSG43CEdo20-Be52s1wNNemAzXmKyTCYqJEiPGvY1gC1PANWV5iLC1TXeVrUUlL09F18d2etQLrS4IaU93-nkbSi3NvkrFbeBRnEBwSZbvvHvtsPPCaTycV_z-CSxzlG3DAh9raNSxsC1cdyHDUOYlDQ8r2_EGbEhifcCz1ctWhu_HMGDuvx8x0nl-lWRMItXbm3lSra8'),

                _ActiveUser(name: 'Mila', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuckli_Uu-e78OHxfbLddrDkTNe6WZSeu6HDXRvwAghPl94U5mucJGASiweyItVfaFIxKf3kwWln1PXybw6QACvy39B4KHdTXq9yH0ODepFLQVKA6b6XcqTiFr5PyVtHw5RxAcVOQkuOGTKBjr8R75jq1vP2JOPTDDEFCTsoII0nICHHyRjwircCGaBieZCpF9ggttNcJWes2wIMycpccXuoOzbpPijemLrFBpeUKcg5sk51bfKEeBJv8EdmefVs3RUX7KsrTlBQL_'),

                _ActiveUser(name: 'David', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbeay1YZOW9eylsf3bF4OvpP0fKFuzj5RTiRwwX3qxxECfspH2UCONFO5rJYOmWrTPfmW3K-4YN6QCnkM-Nz882d3o0SmNLRHrsLk6_3fhdHYq6Nw_TmEtNoZH8Y2HfZm9TAdOgxUD-OVdUFlbaxSd5LMb2DEMP3LCHYgoqj7ZQbuCustyVjRZHhA67gYiLv4JIKjTWdRcKZ0tBlDTiWvg1Zcq5nyzH-Z7UCZyX2xJ3ZMIQWu3dvpfk9qaTYmJS2EsmZEfD1fnF9G9'),

              ],

            ),

          ),

          // Recent Messages

          Padding(

            padding: EdgeInsets.fromLTRB(16, 16, 16, 8),

            child: Text(

              'RECENT MESSAGES',

              style: TextStyle(

                fontSize: 10,

                fontWeight: FontWeight.bold,

                color: Colors.grey,

                letterSpacing: 1.2,

              ),

            ),

          ),

          Expanded(

            child: ListView(

              padding: const EdgeInsets.symmetric(horizontal: 16),

              children: const [

                _ChatListItem(

                  name: 'Alex Rivera',

                  message: 'Hey, are we still meeting at the library for the study session?',

                  time: '12:45 PM',

                  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgY5QxMuPUVJmZV-zbJlhBX40x-7aoPKOKH0_1xhDlEa-R7ZqI520-d2vfxA1I7z0j4O0K9KeWl6Mkn4uBu97NLlyrei_A72BqHxWS5LAaA8BVOLf8eUd6mXowB8KHuc3d59k6qPMhb5Xl3vP1noATcHvv8lqoiBxoxVC9U-cMnofu6Mjxdd236XyapSZNyO7vaUOyqVxL5wFqo8NIzFeGpb_k8ejJmN-ZK3CyWR4BdjgFsqeNnWdc-OQmr1WOvoSGejs-3ci1kVQ3',

                  unreadCount: 2,

                ),

                _ChatListItem(

                  name: 'Sarah Jenkins',

                  message: 'I uploaded the psychology notes to the shared drive!',

                  time: '2:14 PM',

                  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCylgac5vnyw_NWRSMl5mXcMKfl8XFRTFT5Txi-Fl8hNwNy0s8sci7cBI4_zhKH_f3HQiuYpJW3YEbNJ7TIL0QPtqDQ84brpYOYyohiP_MaaFduNx-IfCJmG-qjaMmNo29696vD0FVPxk9TT3dS5oj3I5bVJTx8PJn9cLvQS0An5_Hg2iGI7qLZzLEie2nKhgXpaAlaUNTXXniNAmmNC0LprN8fDI98UlwfprkDw9fQcRuAJ35VTdVt7W_htbtBEhhWYy16Ym-A4pPN',

                ),

                 _ChatListItem(

                  name: "Basket-Ball Varsity '24",

                  message: 'Coach: Practice starts at 5PM sharp tomorrow.',

                  time: 'Yesterday',

                  isGroup: true,

                ),

                _ChatListItem(

                  name: 'Jordan Smith',

                  message: 'That movie was actually pretty good. Thanks for the rec!',

                  time: 'Tuesday',

                  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzREbhdIIRLvAsFw-FLx0WGW2KZeZqB77Ay9vsdxKl-9zmAnp10cEfxj3oQwMr5DlbfmX40E_na5uVfc-Q9nuz7FxEnoLwxvCFDDHCfVCAtYz2Y_CaVf4ExB8YBdbaYWSFQKTCbHGUQRI0p5QJqi5rZd473foqE8utwL9B0lUbtHUrBSg3ZIFOvAQTdfGbWNvHWL_yyiJQiMHVgO_X5YAHsRkZCgS--Q2Vy7TdYI9ShhhaagzOEPxe3axS7ocMyHcIkP4EYcNXTNQQ',

                ),

              ],

            ),

          ),

        ],

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 3),

    );

  }

}

class _ActiveUser extends StatelessWidget {

  final String name;

  final String imageUrl;

  const _ActiveUser({required this.name, required this.imageUrl});

  @override

  Widget build(BuildContext context) {

    return Padding(

      padding: const EdgeInsets.only(right: 16.0),

      child: Column(

        children: [

          Stack(

            children: [

              Container(

                width: 56,

                height: 56,

                padding: const EdgeInsets.all(2),

                decoration: BoxDecoration(

                  shape: BoxShape.circle,

                  border: Border.all(color: AppTheme.primary, width: 2),

                ),

                child: CircleAvatar(backgroundImage: NetworkImage(imageUrl)),

              ),

              Positioned(

                bottom: 2,

                right: 2,

                child: Container(

                  width: 14,

                  height: 14,

                  decoration: BoxDecoration(

                    color: Colors.green,

                    shape: BoxShape.circle,

                    border: Border.all(color: Theme.of(context).scaffoldBackgroundColor, width: 2),

                  ),

                ),

              ),

            ],

          ),

          const SizedBox(height: 4),

          Text(name, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w500)),

        ],

      ),

    );

  }

}

class _ChatListItem extends StatelessWidget {

  final String name;

  final String message;

  final String time;

  final String? imageUrl;

  final int unreadCount;

  final bool isGroup;

  const _ChatListItem({

    required this.name,

    required this.message,

    required this.time,

    this.imageUrl,

    this.unreadCount = 0,

    this.isGroup = false,

  });

  @override

  Widget build(BuildContext context) {

    bool isUnread = unreadCount > 0;

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(

      margin: const EdgeInsets.only(bottom: 4),

      padding: const EdgeInsets.all(12),

      decoration: BoxDecoration(

        color: isUnread ? AppTheme.primary.withOpacity(0.05) : Colors.transparent,

        borderRadius: BorderRadius.circular(16),

      ),

      child: Row(

        children: [

          Stack(

            children: [

              if (isGroup)

                Container(

                  width: 56,

                  height: 56,

                  decoration: BoxDecoration(

                    color: AppTheme.primary.withOpacity(0.1),

                    shape: BoxShape.circle,

                  ),

                  child: const Icon(Icons.groups, color: AppTheme.primary, size: 28),

                )

              else

                CircleAvatar(

                  radius: 28,

                  backgroundImage: imageUrl != null ? NetworkImage(imageUrl!) : null,

                  backgroundColor: Colors.grey[300],

                ),

              if (isUnread)

                Positioned(

                  top: -2,

                  right: -2,

                  child: Container(

                    padding: const EdgeInsets.all(4),

                    decoration: BoxDecoration(

                      color: AppTheme.primary,

                      shape: BoxShape.circle,

                      border: Border.all(color: Theme.of(context).scaffoldBackgroundColor, width: 2),

                    ),

                    child: Text(

                      unreadCount.toString(),

                      style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),

                    ),

                  ),

                ),

            ],

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Row(

                  mainAxisAlignment: MainAxisAlignment.spaceBetween,

                  children: [

                    Text(

                      name,

                      style: TextStyle(

                        fontWeight: isUnread ? FontWeight.bold : FontWeight.w600,

                        fontSize: 15,

                      ),

                    ),

                    Text(

                      time,

                      style: TextStyle(

                        fontSize: 11,

                        color: isUnread ? AppTheme.primary : Colors.grey,

                        fontWeight: isUnread ? FontWeight.bold : FontWeight.normal,

                      ),

                    ),

                  ],

                ),

                const SizedBox(height: 4),

                Text(

                  message,

                  maxLines: 1,

                  overflow: TextOverflow.ellipsis,

                  style: TextStyle(

                    fontSize: 13,

                    color: isUnread ? (isDark ? Colors.white : Colors.black87) : Colors.grey,

                    fontWeight: isUnread ? FontWeight.w600 : FontWeight.normal,

                  ),

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

}
