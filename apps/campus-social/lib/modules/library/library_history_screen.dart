
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class LibraryHistoryScreen extends StatelessWidget {

  const LibraryHistoryScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: SafeArea(

        child: Column(

          children: [

            _buildHeader(context, isDark),

            Expanded(

              child: ListView(

                padding: const EdgeInsets.symmetric(horizontal: 16),

                children: [

                  _buildBalanceCard(isDark),

                  const SizedBox(height: 24),

                  _buildSectionHeader('Pending Fines', '2 Items', isDark),

                  const SizedBox(height: 12),

                  _buildFineCard('The Great Gatsby', 'Late Return • 3 days overdue', 5.00, Icons.warning, isDark),

                  const SizedBox(height: 12),

                  _buildFineCard('Modern Architecture', 'Damaged Page • Reported Oct 20', 7.50, Icons.auto_stories, isDark),

                  const SizedBox(height: 32),

                  _buildSectionHeader('Borrowing History', '', isDark),

                  const SizedBox(height: 16),

                  _buildHistoryItem('To Kill a Mockingbird', 'Harper Lee', 'Oct 15, 2023', 'https://images.unsplash.com/photo-1544383335-c533fd093223?w=200', isDark),

                  _buildHistoryItem('The Republic', 'Plato', 'Sep 28, 2023', 'https://images.unsplash.com/photo-1544383335-c533fd093223?w=200', isDark),

                  _buildHistoryItem('1984', 'George Orwell', 'Aug 12, 2023', 'https://images.unsplash.com/photo-1544383335-c533fd093223?w=200', isDark, opacity: 0.6),

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

      padding: const EdgeInsets.all(16.0),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          IconButton(

            icon: Icon(Icons.arrow_back, color: isDark ? Colors.white70 : Colors.black87),

            onPressed: () => Navigator.pop(context),

          ),

          const Text(

            'Library History',

            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),

          ),

          IconButton(

            icon: Icon(Icons.history, color: isDark ? Colors.white70 : Colors.black87),

            onPressed: () {},

          ),

        ],

      ),

    );

  }

  Widget _buildBalanceCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: AppTheme.primary,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [

          BoxShadow(

            color: AppTheme.primary.withOpacity(0.3),

            blurRadius: 20,

            offset: const Offset(0, 10),

          ),

        ],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          const Text(

            'TOTAL OUTSTANDING BALANCE',

            style: TextStyle(color: Colors.white70, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1),

          ),

          const SizedBox(height: 4),

          const Text(

            '\$12.50',

            style: TextStyle(color: Colors.white, fontSize: 36, fontWeight: FontWeight.w900, letterSpacing: -1),

          ),

          const SizedBox(height: 24),

          Row(

            children: [

              Expanded(

                child: ElevatedButton(

                  onPressed: () {},

                  style: ElevatedButton.styleFrom(

                    backgroundColor: Colors.white,

                    foregroundColor: AppTheme.primary,

                    elevation: 0,

                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

                    padding: const EdgeInsets.symmetric(vertical: 14),

                  ),

                  child: const Text('Pay with Points', style: TextStyle(fontWeight: FontWeight.bold)),

                ),

              ),

              const SizedBox(width: 12),

              Expanded(

                child: OutlinedButton.icon(

                  onPressed: () {},

                  icon: const Icon(Icons.credit_card, size: 16),

                  label: const Text('Credit Card'),

                  style: OutlinedButton.styleFrom(

                    foregroundColor: Colors.white,

                    side: const BorderSide(color: Colors.white38),

                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

                    padding: const EdgeInsets.symmetric(vertical: 14),

                  ),

                ),

              ),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildSectionHeader(String title, String count, bool isDark) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.spaceBetween,

      children: [

        Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

        if (count.isNotEmpty)

          Container(

            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),

            decoration: BoxDecoration(

              color: AppTheme.primary.withOpacity(0.1),

              borderRadius: BorderRadius.circular(8),

            ),

            child: Text(

              count,

              style: const TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold),

            ),

          ),

      ],

    );

  }

  Widget _buildFineCard(String title, String sub, double amount, IconData icon, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: AppTheme.primary.withOpacity(0.1)),

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.all(10),

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

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),

                Text(sub, style: TextStyle(color: isDark ? Colors.white38 : Colors.black38, fontSize: 12)),

              ],

            ),

          ),

          Text(

            '\$${amount.toStringAsFixed(2)}',

            style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16),

          ),

        ],

      ),

    );

  }

  Widget _buildHistoryItem(String title, String author, String date, String img, bool isDark, {double opacity = 1.0}) {

    return Opacity(

      opacity: opacity,

      child: Padding(

        padding: const EdgeInsets.only(bottom: 16),

        child: Row(

          children: [

            Stack(

              children: [

                ClipRRect(

                  borderRadius: BorderRadius.circular(8),

                  child: Image.network(img, width: 60, height: 80, fit: BoxFit.cover),

                ),

                Positioned.fill(

                  child: Container(

                    decoration: BoxDecoration(

                      borderRadius: BorderRadius.circular(8),

                      gradient: LinearGradient(

                        begin: Alignment.topRight,

                        end: Alignment.bottomLeft,

                        colors: [AppTheme.primary.withOpacity(0.2), Colors.transparent],

                      ),

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

                  Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15), maxLines: 1, overflow: TextOverflow.ellipsis),

                  Text(author, style: TextStyle(color: isDark ? Colors.white54 : Colors.black54, fontSize: 13)),

                  const SizedBox(height: 8),

                  Row(

                    children: [

                      Text('RETURNED', style: TextStyle(color: Colors.grey[500], fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 0.5)),

                      const SizedBox(width: 8),

                      Text(date, style: TextStyle(color: isDark ? Colors.white38 : Colors.black38, fontSize: 12)),

                    ],

                  ),

                ],

              ),

            ),

            const Icon(Icons.check_circle, color: AppTheme.primary, size: 24),

          ],

        ),

      ),

    );

  }

}
