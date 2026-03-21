
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class SearchDirectoryScreen extends StatelessWidget {

  const SearchDirectoryScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      appBar: AppBar(

        title: Row(

          children: [

            const Icon(Icons.school, color: AppTheme.primary, size: 28),

            const SizedBox(width: 8),

            const Text('Campus Social', style: TextStyle(fontWeight: FontWeight.bold)),

          ],

        ),

        actions: [

          IconButton(

            icon: const Icon(Icons.notifications_none),

            onPressed: () {},

          ),

        ],

      ),

      body: Column(

        children: [

          // Search Bar

           Padding(

            padding: const EdgeInsets.all(16.0),

            child: TextField(

              decoration: InputDecoration(

                filled: true,

                fillColor: isDark ? const Color(0xFF1E293B) : Color(0xFF64748B).withOpacity(0.05),

                prefixIcon: const Icon(Icons.search, color: Colors.grey, size: 20),

                hintText: 'Search students, faculty, or departments',

                hintStyle: const TextStyle(fontSize: 14),

                border: OutlineInputBorder(

                  borderRadius: BorderRadius.circular(16),

                  borderSide: BorderSide.none,

                ),

                contentPadding: const EdgeInsets.symmetric(vertical: 12),

              ),

            ),

          ),

          // Horizontal Categories

          SizedBox(

            height: 40,

            child: ListView(

              scrollDirection: Axis.horizontal,

              padding: const EdgeInsets.symmetric(horizontal: 16),

              children: [

                _FilterChip(label: 'All', isActive: true),

                _FilterChip(label: 'Students'),

                _FilterChip(label: 'Faculty'),

                _FilterChip(label: 'Clubs'),

              ],

            ),

          ),

          // Directory List

          Expanded(

            child: ListView(

              padding: const EdgeInsets.all(16),

              children: [

                const Text('DIRECTORY', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Colors.grey, letterSpacing: 2.0)),

                const SizedBox(height: 16),

                 const _DirectoryItem(

                  name: 'Alex Thompson',

                  department: 'Computer Science • Junior',

                  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxKnQd9PBBHPYJnb2kDJzvShIBZcipirh9TAsm8o9mnjuDzN5Bx2Ab3FJ1Ys1r0i5dc2FK3UCcEWhZccfe0vP5nJYtoSTCm8E7r04ljYdSW_YUzCAA02KiqF0j-KvZS8T1BVDreXNrd8m1-utxsztEFmX0RCPdW8y3rwQufhQtd1xKYa_Tc9ixTT7j-RVVdRcVzkNL0UgyGXkB085uCGCUVaZyr4CTa6mxM9fjK9xIFrKNlo216Syif3yRYx7Wp32b2nEr4OpIcqJ_',

                  actionLabel: 'Connect',

                ),

                const SizedBox(height: 12),

                 const _DirectoryItem(

                  name: 'Dr. Sarah Jenkins',

                  department: 'Faculty • Psychology Dept.',

                  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUITBsQ6KzGKODA7mcOxijdj8YhaakpXl4uRVeK7saaEvq4-RsXU8k3UKlRUxnKUPHryW_ktfldATQp4Y6tC9fJSnPEYVgftTJ0PZNpxmfm39EVKsj1Y1nqlfnkheLLrWeKjt3LLkUNtFCDFvzEUmvg77p-jd0zmLlqdu3-FdpZHFRPxN5z4nZrAQGE81GVPWjQSVPgGjTjGYh5cTRnvIIJsfXL7kyqr3xb59Rza224nT0Um3oJ2DsbSfGv8hc7uia_S5ueqgj8Gdl',

                  actionLabel: 'Message',

                ),

                 const SizedBox(height: 12),

                 const _DirectoryItem(

                  name: 'Marcus Chen',

                  department: 'Business Admin • Senior',

                  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAo0ozi9wX8XCnmlcEhTZLHsRbpGlp8wz66rDXBvXjYLXRxbI44e8KtPprul3T77-QWV0795FMP_vpZ9iXQGfEmCJ6AIZ_XuVTfvieW2kHHWLmHcCGi89Rl_Z-pflHWEg45fRHImsor2y0Kl384Yy_fyWzIz1Z1aKmaT4E8Jwl3d9xZmLZS78waVvq5hKQY8D3KMyS7DoCkmpHhlCUw8a9BkJXa54JLJjt-taJIulWyI-T4OOGfJFAABnbv_87ZYJCcbuzTkki3goY',

                  actionLabel: 'Connect',

                ),

                 const SizedBox(height: 12),

                 const _DirectoryItem(

                  name: 'Elena Rodriguez',

                  department: 'Fine Arts • Sophomore',

                  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2DROVtz58WVr2qw2b_z4kpgU52JVkbT20rvPQSh9Ou230aOk5QDQcWsOlzkVPZe208OIgiLF_EVuzcNqSzegAmmgQTqmcx24aUKSl-Baa8I35g7AGaL0z4viKP9AAl6aXNexRu2qPts0DXov0zqYnyyE7Myk5B1nZ0N-2GAK4wkR8GcIflipNQzoDxS0NBUtqxBfMK5UG2OcaofrOx8oC7ZwbjFKm8qGLUozkiO_vfW64HEIAfTPxBOHcDerce7dxK_FzuHA7j9pn',

                  actionLabel: 'Connect',

                ),

                const SizedBox(height: 100),

              ],

            ),

          ),

        ],

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 1), // Explore is index 1

    );

  }

}

class _FilterChip extends StatelessWidget {

  final String label;

  final bool isActive;

  const _FilterChip({required this.label, this.isActive = false});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Padding(

      padding: const EdgeInsets.only(right: 8.0),

      child: Container(

        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),

        decoration: BoxDecoration(

          color: isActive ? AppTheme.primary : (isDark ? const Color(0xFF1E293B) : Color(0xFF64748B).withOpacity(0.05)),

          borderRadius: BorderRadius.circular(20),

        ),

        child: Text(

          label,

          style: TextStyle(

            color: isActive ? Colors.white : (isDark ? Colors.grey[300] : Colors.grey[700]),

            fontWeight: isActive ? FontWeight.bold : FontWeight.w500,

            fontSize: 13,

          ),

        ),

      ),

    );

  }

}

class _DirectoryItem extends StatelessWidget {

  final String name;

  final String department;

  final String imageUrl;

  final String actionLabel;

  const _DirectoryItem({

    required this.name,

    required this.department,

    required this.imageUrl,

    required this.actionLabel,

  });

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(

       padding: const EdgeInsets.all(12),

      decoration: BoxDecoration(

        color: isDark ? const Color(0xFF1E293B).withOpacity(0.5) : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: Colors.grey.withOpacity(0.1)),

      ),

      child: Row(

        children: [

           CircleAvatar(

            radius: 24,

            backgroundImage: NetworkImage(imageUrl),

          ),

          const SizedBox(width: 12),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                Text(department, style: const TextStyle(color: Colors.grey, fontSize: 11)),

              ],

            ),

          ),

          ElevatedButton(

            onPressed: () {},

            child: Text(actionLabel),

            style: ElevatedButton.styleFrom(

              backgroundColor: AppTheme.primary.withOpacity(0.1),

              foregroundColor: AppTheme.primary,

              minimumSize: const Size(80, 36),

              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),

              elevation: 0,

              textStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),

            ),

          ),

        ],

      ),

    );

  }

}
