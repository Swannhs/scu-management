
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class MarketplaceBuyerHubScreen extends StatelessWidget {

  const MarketplaceBuyerHubScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: SafeArea(

        child: Column(

          children: [

            _buildHeader(isDark),

            Expanded(

              child: SingleChildScrollView(

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    _buildHeroSearch(isDark),

                    _buildCategories(isDark),

                    _buildSectionHeader('Trending Near You', isDark),

                    _buildProductsGrid(context, isDark),

                    const SizedBox(height: 32),

                    _buildPromotionBanner(isDark),

                    const SizedBox(height: 100),

                  ],

                ),

              ),

            ),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2), // Market index

    );

  }

  Widget _buildHeader(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Row(

            children: [

              Container(

                width: 40,

                height: 40,

                decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), shape: BoxShape.circle),

                child: const Icon(Icons.account_circle, color: AppTheme.primary),

              ),

              const SizedBox(width: 12),

              Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  Text('WELCOME BACK', style: TextStyle(color: AppTheme.primary.withOpacity(0.6), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

                  const Text('Alex Johnson', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),

                ],

              ),

            ],

          ),

          Row(

            children: [

              Stack(

                children: [

                  IconButton(icon: const Icon(Icons.notifications_none), onPressed: () {}),

                  Positioned(

                    top: 12,

                    right: 12,

                    child: Container(width: 8, height: 8, decoration: BoxDecoration(color: Colors.red, shape: BoxShape.circle, border: Border.all(color: Colors.white, width: 1.5))),

                  ),

                ],

              ),

              Container(

                width: 40,

                height: 40,

                decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.05), shape: BoxShape.circle),

                child: const Icon(Icons.shopping_cart_outlined, color: Colors.grey),

              ),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildHeroSearch(bool isDark) {

    return Padding(

      padding: const EdgeInsets.all(16.0),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          const Text(

            'Find what you need\nfor campus life.',

            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, height: 1.2),

          ),

          const SizedBox(height: 16),

          Container(

            padding: const EdgeInsets.symmetric(horizontal: 16),

            decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.05), borderRadius: BorderRadius.circular(16)),

            child: Row(

              children: [

                const Icon(Icons.search, color: AppTheme.primary),

                const SizedBox(width: 12),

                const Expanded(

                  child: TextField(

                    decoration: InputDecoration(

                      hintText: 'Search books, electronics, dorm gear...',

                      hintStyle: TextStyle(color: Colors.grey, fontSize: 14),

                      border: InputBorder.none,

                    ),

                  ),

                ),

                Container(

                  padding: const EdgeInsets.all(8),

                  decoration: BoxDecoration(color: AppTheme.primary, borderRadius: BorderRadius.circular(8)),

                  child: const Icon(Icons.tune, color: Colors.white, size: 16),

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildCategories(bool isDark) {

    final cats = [

      {'icon': Icons.grid_view, 'label': 'All', 'active': true},

      {'icon': Icons.book_outlined, 'label': 'Books', 'active': false},

      {'icon': Icons.devices, 'label': 'Electronics', 'active': false},

      {'icon': Icons.bed_outlined, 'label': 'Dorm Gear', 'active': false},

    ];

    return SizedBox(

      height: 50,

      child: ListView.builder(

        scrollDirection: Axis.horizontal,

        padding: const EdgeInsets.symmetric(horizontal: 16),

        itemCount: cats.length,

        itemBuilder: (context, index) {

          final cat = cats[index];

          bool active = cat['active'] as bool;

          return Container(

            margin: const EdgeInsets.only(right: 12),

            padding: const EdgeInsets.symmetric(horizontal: 16),

            decoration: BoxDecoration(

              color: active ? AppTheme.primary : (isDark ? Color(0xFF1E293B) : Colors.white),

              borderRadius: BorderRadius.circular(16),

              border: active ? null : Border.all(color: AppTheme.primary.withOpacity(0.1)),

              boxShadow: active ? [BoxShadow(color: AppTheme.primary.withOpacity(0.3), blurRadius: 8, offset: const Offset(0, 4))] : null,

            ),

            child: Row(

              children: [

                Icon(cat['icon'] as IconData, color: active ? Colors.white : AppTheme.primary, size: 18),

                const SizedBox(width: 8),

                Text(cat['label'] as String, style: TextStyle(color: active ? Colors.white : (isDark ? Colors.white70 : Colors.black87), fontWeight: FontWeight.bold, fontSize: 13)),

              ],

            ),

          );

        },

      ),

    );

  }

  Widget _buildSectionHeader(String title, bool isDark) {

    return Padding(

      padding: const EdgeInsets.fromLTRB(16, 32, 16, 16),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

          const Text('SEE ALL', style: TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

        ],

      ),

    );

  }

  Widget _buildProductsGrid(BuildContext context, bool isDark) {

    final products = [

      {'title': 'Economics 101: 2024 Ed.', 'price': '45.00', 'cat': 'Textbooks', 'img': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400'},

      {'title': 'Wireless Headphones', 'price': '89.99', 'cat': 'Electronics', 'img': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'},

      {'title': 'LED Desk Lamp Pro', 'price': '18.50', 'cat': 'Dorm Gear', 'img': 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=400'},

      {'title': 'Task Study Chair', 'price': '35.00', 'cat': 'Furniture', 'img': 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400'},

    ];

    return GridView.builder(

      shrinkWrap: true,

      physics: const NeverScrollableScrollPhysics(),

      padding: const EdgeInsets.symmetric(horizontal: 16),

      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2, crossAxisSpacing: 16, mainAxisSpacing: 16, childAspectRatio: 0.7),

      itemCount: products.length,

      itemBuilder: (context, index) {

        final product = products[index];

        return _buildProductCard(context, product, isDark);

      },

    );

  }

  Widget _buildProductCard(BuildContext context, Map<String, String> product, bool isDark) {

    return GestureDetector(

      onTap: () => Navigator.pushNamed(context, '/product-detail'),

      child: Container(

        decoration: BoxDecoration(

          color: isDark ? AppTheme.cardDark : Colors.white,

          borderRadius: BorderRadius.circular(24),

          border: Border.all(color: AppTheme.primary.withOpacity(0.05)),

          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

        ),

        clipBehavior: Clip.antiAlias,

        child: Column(

          children: [

            Expanded(

              child: Stack(

                children: [

                  Image.network(product['img']!, width: double.infinity, height: double.infinity, fit: BoxFit.cover),

                  Positioned(

                    top: 12,

                    right: 12,

                    child: Container(

                      padding: const EdgeInsets.all(6),

                      decoration: BoxDecoration(color: Colors.white.withOpacity(0.9), shape: BoxShape.circle),

                      child: const Icon(Icons.favorite, color: AppTheme.primary, size: 16),

                    ),

                  ),

                ],

              ),

            ),

            Padding(

              padding: const EdgeInsets.all(12),

              child: Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  Text(product['cat']!.toUpperCase(), style: TextStyle(color: AppTheme.primary.withOpacity(0.7), fontSize: 8, fontWeight: FontWeight.bold, letterSpacing: 0.5)),

                  const SizedBox(height: 2),

                  Text(product['title']!, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13), maxLines: 1, overflow: TextOverflow.ellipsis),

                  const SizedBox(height: 8),

                  Row(

                    mainAxisAlignment: MainAxisAlignment.spaceBetween,

                    children: [

                      Text('\$${product['price']}', style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 16)),

                      Container(

                        padding: const EdgeInsets.all(6),

                        decoration: BoxDecoration(color: AppTheme.primary, borderRadius: BorderRadius.circular(8)),

                        child: const Icon(Icons.add, color: Colors.white, size: 16),

                      ),

                    ],

                  ),

                ],

              ),

            ),

          ],

        ),

      ),

    );

  }

  Widget _buildPromotionBanner(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 16),

      child: Container(

        height: 120,

        decoration: BoxDecoration(

          gradient: const LinearGradient(colors: [AppTheme.primary, Color(0xFF10b981)], begin: Alignment.centerLeft, end: Alignment.centerRight),

          borderRadius: BorderRadius.circular(24),

          boxShadow: [BoxShadow(color: AppTheme.primary.withOpacity(0.3), blurRadius: 12, offset: const Offset(0, 4))],

        ),

        padding: const EdgeInsets.all(24),

        child: Stack(

          children: [

            Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              mainAxisAlignment: MainAxisAlignment.center,

              children: [

                const Text('FLASH SALE', style: TextStyle(color: Colors.white70, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 2)),

                const Text('20% Off All Electronics', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),

                Text('Ends in 02:45:12', style: TextStyle(color: Colors.white.withOpacity(0.8), fontSize: 10, fontWeight: FontWeight.w500)),

              ],

            ),

            Positioned(

              right: -20,

              bottom: -40,

              child: Icon(Icons.bolt, color: Colors.white10, size: 140),

            ),

          ],

        ),

      ),

    );

  }

}
