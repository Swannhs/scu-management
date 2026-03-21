
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class BorrowedBooksScreen extends StatelessWidget {

  const BorrowedBooksScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: SafeArea(

        child: Column(

          children: [

            _buildHeader(context, isDark),

            _buildTabs(isDark),

            Expanded(

              child: ListView(

                padding: const EdgeInsets.all(16),

                children: [

                  _buildSectionHeader('Currently Borrowed', '2 Books', isDark),

                  const SizedBox(height: 12),

                  _buildBorrowedBookCard(

                    'The Great Gatsby',

                    'F. Scott Fitzgerald',

                    'Due in 3 days',

                    true,

                    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',

                    isDark,

                  ),

                  const SizedBox(height: 12),

                  _buildBorrowedBookCard(

                    'Atomic Habits',

                    'James Clear',

                    'Due: Nov 12, 2023',

                    false,

                    'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400',

                    isDark,

                  ),

                  const SizedBox(height: 32),

                  _buildSectionHeader('Pending Reservations', '', isDark),

                  const SizedBox(height: 12),

                  _buildReservationItem('Deep Work', 'Cal Newport', 2, isDark),

                  const SizedBox(height: 12),

                  _buildReservationItem('The Psychology of Money', 'Morgan Housel', 14, isDark),

                  const SizedBox(height: 100),

                ],

              ),

            ),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2),

    );

  }

  Widget _buildHeader(BuildContext context, bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),

      child: Row(

        children: [

          IconButton(

            icon: Icon(Icons.arrow_back, color: isDark ? Colors.white : Colors.black),

            onPressed: () => Navigator.pop(context),

          ),

          const Expanded(

            child: Text(

              'My Library',

              textAlign: TextAlign.center,

              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),

            ),

          ),

          IconButton(

            icon: Icon(Icons.search, color: isDark ? Colors.white : Colors.black),

            onPressed: () {},

          ),

        ],

      ),

    );

  }

  Widget _buildTabs(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 16),

      child: Row(

        children: [

          _buildTab('Borrowed', true, isDark),

          const SizedBox(width: 24),

          _buildTab('History', false, isDark),

        ],

      ),

    );

  }

  Widget _buildTab(String label, bool active, bool isDark) {

    return Container(

      padding: const EdgeInsets.only(bottom: 8, top: 12),

      decoration: BoxDecoration(

        border: Border(

          bottom: BorderSide(

            color: active ? AppTheme.primary : Colors.transparent,

            width: 2,

          ),

        ),

      ),

      child: Text(

        label,

        style: TextStyle(

          color: active ? AppTheme.primary : (isDark ? Colors.white54 : Colors.grey),

          fontWeight: active ? FontWeight.bold : FontWeight.w500,

          fontSize: 14,

        ),

      ),

    );

  }

  Widget _buildSectionHeader(String title, String count, bool isDark) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.spaceBetween,

      children: [

        Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),

        if (count.isNotEmpty)

          Container(

            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),

            decoration: BoxDecoration(

              color: AppTheme.primary.withOpacity(0.1),

              borderRadius: BorderRadius.circular(12),

            ),

            child: Text(

              count,

              style: const TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold),

            ),

          ),

      ],

    );

  }

  Widget _buildBorrowedBookCard(String title, String author, String due, bool isSoon, String img, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(12),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: AppTheme.primary.withOpacity(0.05)),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Row(

        children: [

          ClipRRect(

            borderRadius: BorderRadius.circular(12),

            child: Image.network(img, width: 80, height: 110, fit: BoxFit.cover),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Row(

                  children: [

                    Icon(

                      isSoon ? Icons.schedule : Icons.event_available,

                      size: 14,

                      color: isSoon ? Colors.orange : AppTheme.primary,

                    ),

                    const SizedBox(width: 4),

                    Text(

                      due.toUpperCase(),

                      style: TextStyle(

                        color: isSoon ? Colors.orange : AppTheme.primary,

                        fontSize: 10,

                        fontWeight: FontWeight.bold,

                        letterSpacing: 0.5,

                      ),

                    ),

                  ],

                ),

                const SizedBox(height: 6),

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

                Text(author, style: TextStyle(color: isDark ? Colors.white60 : Colors.black54, fontSize: 13)),

                const SizedBox(height: 14),

                Row(

                  children: [

                    Expanded(

                      child: ElevatedButton(

                        onPressed: () {},

                        style: ElevatedButton.styleFrom(

                          backgroundColor: AppTheme.primary,

                          foregroundColor: Colors.white,

                          elevation: 0,

                          padding: const EdgeInsets.symmetric(vertical: 8),

                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),

                        ),

                        child: const Text('Renew', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),

                      ),

                    ),

                    const SizedBox(width: 8),

                    Expanded(

                      child: ElevatedButton(

                        onPressed: () {},

                        style: ElevatedButton.styleFrom(

                          backgroundColor: AppTheme.primary.withOpacity(0.1),

                          foregroundColor: AppTheme.primary,

                          elevation: 0,

                          padding: const EdgeInsets.symmetric(vertical: 8),

                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),

                        ),

                        child: const Text('Return', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),

                      ),

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

  Widget _buildReservationItem(String title, String author, int pos, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(12),

      decoration: BoxDecoration(

        color: AppTheme.primary.withOpacity(0.05),

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: AppTheme.primary.withOpacity(0.1)),

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.all(8),

            decoration: BoxDecoration(

              color: AppTheme.primary.withOpacity(0.1),

              borderRadius: BorderRadius.circular(12),

            ),

            child: const Icon(Icons.book, color: AppTheme.primary, size: 20),

          ),

          const SizedBox(width: 12),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                Text(author, style: TextStyle(color: isDark ? Colors.white60 : Colors.black54, fontSize: 12)),

              ],

            ),

          ),

          Column(

            crossAxisAlignment: CrossAxisAlignment.end,

            children: [

              const Text(

                'QUEUE POSITION',

                style: TextStyle(color: AppTheme.primary, fontSize: 8, fontWeight: FontWeight.bold),

              ),

              Text(

                '#$pos',

                style: const TextStyle(color: AppTheme.primary, fontSize: 18, fontWeight: FontWeight.w900, height: 1),

              ),

            ],

          ),

        ],

      ),

    );

  }

}
