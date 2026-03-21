
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class StandardPostCard extends StatelessWidget {

  final String author;

  final String time;

  final String category;

  final String content;

  final int likes;

  final int comments;

  final int shares;

  const StandardPostCard({

    super.key,

    required this.author,

    required this.time,

    required this.category,

    required this.content,

    required this.likes,

    required this.comments,

    required this.shares,

  });

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? const Color(0xFF1E293B) : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: AppTheme.primary.withOpacity(0.05)),

        boxShadow: [

          BoxShadow(

            color: Colors.black.withOpacity(0.02),

            blurRadius: 10,

            offset: const Offset(0, 4),

          ),

        ],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            children: [

              const CircleAvatar(backgroundColor: Colors.grey, radius: 20),

              const SizedBox(width: 12),

              Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  Text(

                    author,

                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),

                  ),

                  Text(

                    '$time • $category',

                    style: TextStyle(color: Colors.grey[400], fontSize: 11),

                  ),

                ],

              ),

              const Spacer(),

              const Icon(Icons.more_horiz, color: Colors.grey),

            ],

          ),

          const SizedBox(height: 12),

          Text(

            content,

            style: TextStyle(

              fontSize: 14,

              color: isDark ? Colors.grey[300] : Colors.grey[700],

              height: 1.5,

            ),

          ),

          const SizedBox(height: 16),

          const Divider(height: 1, color: Color(0xFFF1F5F9)),

          const SizedBox(height: 12),

          Row(

            children: [

              _ActionButton(icon: Icons.favorite, label: likes.toString(), color: AppTheme.primary, isActive: true),

              const SizedBox(width: 24),

              _ActionButton(icon: Icons.chat_bubble_outline, label: comments.toString(), color: Colors.grey),

              const SizedBox(width: 24),

              _ActionButton(icon: Icons.share_outlined, label: shares.toString(), color: Colors.grey),

            ],

          ),

        ],

      ),

    );

  }

}

class EventPostCard extends StatelessWidget {

  final String organizer;

  final String time;

  final String category;

  final String title;

  final String description;

  final String imageUrl;

  final int attendingCount;

  const EventPostCard({

    super.key,

    required this.organizer,

    required this.time,

    required this.category,

    required this.title,

    required this.description,

    required this.imageUrl,

    required this.attendingCount,

  });

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(

      decoration: BoxDecoration(

        color: isDark ? const Color(0xFF1E293B) : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: AppTheme.primary.withOpacity(0.05)),

        boxShadow: [

          BoxShadow(

            color: Colors.black.withOpacity(0.02),

            blurRadius: 10,

            offset: const Offset(0, 4),

          ),

        ],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          ClipRRect(

            borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),

            child: Stack(

              children: [

                Image.network(

                  imageUrl,

                  height: 180,

                  width: double.infinity,

                  fit: BoxFit.cover,

                ),

                Positioned(

                  top: 16,

                  left: 16,

                  child: Container(

                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),

                    decoration: BoxDecoration(

                      color: AppTheme.primary,

                      borderRadius: BorderRadius.circular(20),

                    ),

                    child: const Text(

                      'UPCOMING EVENT',

                      style: TextStyle(

                        color: Colors.white,

                        fontSize: 10,

                        fontWeight: FontWeight.bold,

                        letterSpacing: 1.2,

                      ),

                    ),

                  ),

                ),

              ],

            ),

          ),

          Padding(

            padding: const EdgeInsets.all(16),

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                 Row(

                  children: [

                    const CircleAvatar(backgroundColor: Colors.grey, radius: 16),

                    const SizedBox(width: 8),

                    Column(

                      crossAxisAlignment: CrossAxisAlignment.start,

                      children: [

                        Text(

                          organizer,

                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),

                        ),

                        Text(

                          '$time • $category',

                          style: TextStyle(color: Colors.grey[400], fontSize: 10),

                        ),

                      ],

                    ),

                    const Spacer(),

                    const Icon(Icons.more_horiz, color: Colors.grey, size: 20),

                  ],

                ),

                const SizedBox(height: 12),

                Text(

                  title,

                  style: const TextStyle(

                    fontWeight: FontWeight.bold,

                    fontSize: 18,

                  ),

                ),

                const SizedBox(height: 8),

                Text(

                  description,

                  style: TextStyle(

                    fontSize: 14,

                    color: isDark ? Colors.grey[400] : Colors.grey[600],

                    height: 1.5,

                  ),

                ),

                const SizedBox(height: 16),

                Row(

                  children: [

                    // Stack of avatars (simplified)

                    const Text(

                      '+42 attending',

                      style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 12),

                    ),

                    const Spacer(),

                    ElevatedButton(

                      onPressed: () {},

                      style: ElevatedButton.styleFrom(

                        backgroundColor: AppTheme.primary,

                        foregroundColor: Colors.white,

                        shape: RoundedRectangleBorder(

                          borderRadius: BorderRadius.circular(12),

                        ),

                        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),

                        elevation: 0,

                      ),

                      child: const Text('Join Event', style: TextStyle(fontWeight: FontWeight.bold)),

                    ),

                  ],

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

}

class _ActionButton extends StatelessWidget {

  final IconData icon;

  final String label;

  final Color color;

  final bool isActive;

  const _ActionButton({

    required this.icon,

    required this.label,

    required this.color,

    this.isActive = false,

  });

  @override

  Widget build(BuildContext context) {

    return Row(

      children: [

        Icon(icon, size: 20, color: color),

        const SizedBox(width: 6),

        Text(

          label,

          style: TextStyle(

            fontSize: 12,

            fontWeight: FontWeight.bold,

            color: color,

          ),

        ),

      ],

    );

  }

}
