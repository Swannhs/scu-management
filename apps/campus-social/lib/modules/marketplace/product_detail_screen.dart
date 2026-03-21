
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class ProductDetailScreen extends StatelessWidget {

  const ProductDetailScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: Stack(

        children: [

          CustomScrollView(

            slivers: [

              _buildAppBar(context, isDark),

              SliverToBoxAdapter(

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    _buildImageSection(isDark),

                    _buildProductDetails(isDark),

                    _buildSellerSection(isDark),

                    _buildReviewsSection(isDark),

                    const SizedBox(height: 120),

                  ],

                ),

              ),

            ],

          ),

          _buildBottomActions(context, isDark),

        ],

      ),

    );

  }

  Widget _buildAppBar(BuildContext context, bool isDark) {

    return SliverAppBar(

      backgroundColor: (isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight).withOpacity(0.8),

      elevation: 0,

      pinned: true,

      leading: IconButton(

        icon: Icon(Icons.arrow_back, color: isDark ? Colors.white : Colors.black),

        onPressed: () => Navigator.pop(context),

      ),

      title: const Text('Marketplace', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

      actions: [

        IconButton(icon: const Icon(Icons.share), onPressed: () {}),

      ],

    );

  }

  Widget _buildImageSection(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(vertical: 0),

      child: Stack(

        children: [

          Container(

            height: 400,

            width: double.infinity,

            decoration: BoxDecoration(

              image: DecorationImage(

                image: NetworkImage('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200'),

                fit: BoxFit.cover,

              ),

            ),

          ),

          Positioned(

            top: 16,

            right: 16,

            child: Container(

              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

              decoration: BoxDecoration(color: Colors.white.withOpacity(0.9), borderRadius: BorderRadius.circular(8)),

              child: const Text('1/4', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 12)),

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildProductDetails(bool isDark) {

    return Padding(

      padding: const EdgeInsets.all(24.0),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              const Expanded(

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Text(

                      'Organic Chemistry: Structure and Function',

                      style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, height: 1.2),

                    ),

                    SizedBox(height: 8),

                    Text('\$45.00', style: TextStyle(color: AppTheme.primary, fontSize: 24, fontWeight: FontWeight.bold)),

                  ],

                ),

              ),

              IconButton(icon: const Icon(Icons.favorite, color: AppTheme.primary, size: 28), onPressed: () {}),

            ],

          ),

          const SizedBox(height: 24),

          Wrap(

            spacing: 8,

            children: [

              _buildTag('Like New', Icons.check_circle),

              _buildTag('Pickup Only', Icons.local_shipping),

              _buildTag('Verified Student', Icons.school),

            ],

          ),

          const SizedBox(height: 32),

          const Text('Description', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

          const SizedBox(height: 8),

          Text(

            'Hardcover 8th edition. Used for one semester, no highlights or markings inside. Includes the digital access code (unused). Perfect for CHEM 201/202 students. Price is firm but open to bundle deals if you buy other books from my profile.',

            style: TextStyle(color: isDark ? Colors.white60 : Colors.black54, height: 1.6, fontSize: 14),

          ),

        ],

      ),

    );

  }

  Widget _buildTag(String label, IconData icon) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),

      decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(20)),

      child: Row(

        mainAxisSize: MainAxisSize.min,

        children: [

          Icon(icon, color: AppTheme.primary, size: 14),

          const SizedBox(width: 4),

          Text(label, style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 11)),

        ],

      ),

    );

  }

  Widget _buildSellerSection(bool isDark) {

    return Container(

      margin: const EdgeInsets.only(top: 16),

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: AppTheme.primary.withOpacity(0.05),

        borderRadius: const BorderRadius.vertical(top: Radius.circular(32)),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          const Text('Seller & Pickup', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

          const SizedBox(height: 24),

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              Row(

                children: [

                  CircleAvatar(backgroundImage: NetworkImage('https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100'), radius: 24),

                  SizedBox(width: 12),

                  Column(

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      Text('Alex Rivera', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),

                      Row(

                        children: [

                          Icon(Icons.star, color: Colors.orange, size: 14),

                          SizedBox(width: 4),

                          Text('4.9 (42 reviews)', style: TextStyle(color: Colors.grey, fontSize: 12)),

                        ],

                      ),

                    ],

                  ),

                ],

              ),

              OutlinedButton(

                onPressed: () {},

                style: OutlinedButton.styleFrom(

                  foregroundColor: AppTheme.primary,

                  side: BorderSide(color: AppTheme.primary.withOpacity(0.2)),

                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),

                ),

                child: const Text('View Profile', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),

              ),

            ],

          ),

          const SizedBox(height: 24),

          Container(

            padding: const EdgeInsets.all(16),

            decoration: BoxDecoration(

              color: isDark ? AppTheme.backgroundDark : Colors.white,

              borderRadius: BorderRadius.circular(16),

              boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10)],

            ),

            child: Row(

              children: [

                Container(

                  padding: const EdgeInsets.all(8),

                  decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(8)),

                  child: const Icon(Icons.location_on, color: AppTheme.primary, size: 20),

                ),

                const SizedBox(width: 16),

                Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Text('South Hall Student Lounge', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                    Text('University Campus • 0.2 miles away', style: TextStyle(color: Colors.grey, fontSize: 11)),

                  ],

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildReviewsSection(bool isDark) {

    return Padding(

      padding: const EdgeInsets.all(24.0),

      child: Column(

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              const Text('Reviews', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

              TextButton(onPressed: () {}, child: const Text('See all', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold))),

            ],

          ),

          const SizedBox(height: 16),

          Container(

            padding: const EdgeInsets.all(16),

            decoration: BoxDecoration(color: isDark ? Colors.white.withOpacity(0.03) : Colors.grey[50], borderRadius: BorderRadius.circular(16)),

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Row(

                  mainAxisAlignment: MainAxisAlignment.spaceBetween,

                  children: [

                    Row(

                      children: List.generate(5, (index) => const Icon(Icons.star, color: Colors.orange, size: 14)),

                    ),

                    Text('2 days ago', style: TextStyle(color: Colors.grey[400], fontSize: 10)),

                  ],

                ),

                const SizedBox(height: 8),

                Text(

                  '"Great communication! Book was exactly as described. Very friendly student."',

                  style: TextStyle(color: isDark ? Colors.white70 : Colors.black87, fontSize: 13, fontStyle: FontStyle.italic),

                ),

                const SizedBox(height: 8),

                Text('— Sarah M.', style: TextStyle(color: Colors.grey[500], fontSize: 11, fontWeight: FontWeight.bold)),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildBottomActions(BuildContext context, bool isDark) {

    return Positioned(

      bottom: 0,

      left: 0,

      right: 0,

      child: Container(

        padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),

        decoration: BoxDecoration(

          color: (isDark ? AppTheme.backgroundDark : Colors.white).withOpacity(0.9),

          border: Border(top: BorderSide(color: AppTheme.primary.withOpacity(0.1))),

        ),

        child: Row(

          children: [

            Expanded(

              flex: 1,

              child: ElevatedButton.icon(

                onPressed: () {},

                icon: const Icon(Icons.chat_bubble_outline, size: 18),

                label: const Text('Message', style: TextStyle(fontWeight: FontWeight.bold)),

                style: ElevatedButton.styleFrom(

                  backgroundColor: AppTheme.primary.withOpacity(0.1),

                  foregroundColor: AppTheme.primary,

                  elevation: 0,

                  padding: const EdgeInsets.symmetric(vertical: 16),

                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

                ),

              ),

            ),

            const SizedBox(width: 12),

            Expanded(

              flex: 2,

              child: ElevatedButton.icon(

                onPressed: () => Navigator.pushNamed(context, '/checkout'),

                icon: const Icon(Icons.shopping_cart_outlined, size: 18),

                label: const Text('Buy Now', style: TextStyle(fontWeight: FontWeight.bold)),

                style: ElevatedButton.styleFrom(

                  backgroundColor: AppTheme.primary,

                  foregroundColor: Colors.white,

                  elevation: 8,

                  shadowColor: AppTheme.primary.withOpacity(0.4),

                  padding: const EdgeInsets.symmetric(vertical: 16),

                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

                ),

              ),

            ),

          ],

        ),

      ),

    );

  }

}
