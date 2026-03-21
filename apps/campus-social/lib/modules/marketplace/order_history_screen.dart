
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class OrderHistoryScreen extends StatelessWidget {

  const OrderHistoryScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      appBar: AppBar(

        leading: IconButton(

          icon: const Icon(Icons.arrow_back),

          onPressed: () {},

        ),

        title: const Text('My Orders', style: TextStyle(fontWeight: FontWeight.bold)),

        centerTitle: true,

        actions: [

          IconButton(

            icon: const Icon(Icons.more_vert),

            onPressed: () {},

          ),

        ],

      ),

      body: Column(

        children: [

          // Tabs

          Container(

             decoration: BoxDecoration(

              border: Border(bottom: BorderSide(color: Colors.grey.withOpacity(0.1))),

            ),

            child: Row(

              mainAxisAlignment: MainAxisAlignment.spaceAround,

              children: [

                _OrderTab(label: 'Active Orders', isActive: true),

                _OrderTab(label: 'Past Purchases'),

              ],

            ),

          ),

          Expanded(

            child: ListView(

              padding: const EdgeInsets.all(16),

              children: [

                // Active Section

                 Row(

                  mainAxisAlignment: MainAxisAlignment.spaceBetween,

                  children: [

                    const Text('Waiting for Pickup', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

                    Container(

                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

                      decoration: BoxDecoration(

                        color: AppTheme.primary.withOpacity(0.1),

                        borderRadius: BorderRadius.circular(16),

                      ),

                      child: const Text('2 ITEMS', style: TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.1)),

                    ),

                  ],

                ),

                const SizedBox(height: 16),

                 const _ActiveOrderCard(

                  title: 'Organic Tote Bag',

                  location: 'Campus Bookstore Drop-off',

                  price: '12.00',

                  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGWKwP9cCcljVn6YZuW3F8SQSI40eX7Ztf393csE36f9N-5cDLoaDgpzKloYj1rHdKOuCSbqYn1fUonxxb8QC4KiFM00Xw2k6JTWKnfe1BtFv7IDmzvvenyWZzdM3klzgKefM8ZxU7BAc41R5XqyZF7UroMzzwMX0U4D4Z5ki5bIi3LnxhXk8T8TD-hHJBr-qXGz1TpG3AbHeZQ32taCKVZLW5cjaKqL4vaaA1u2b84Wivmh-0i2j7KAK7pxFBjEOsrcAiGvWauURS',

                ),

                const SizedBox(height: 16),

                const _ActiveOrderCard(

                  title: 'Calculus Textbook & Notes',

                  location: 'Student Union, Level 2',

                  price: '45.00',

                  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs9cCRugAZdLtINEUPROISbuQS5Q86stkNkEeVegVbwxWT8Pb9Fr5UTP7bC9Q7odzYtUI7T7sgxItrnaoxwpWLgPwh6HyoqJm9eO6SprQhQs4dTsuE-gVW39Cz_BJE7apSp0vrnoAKpa2bkpTG00WzFom-F5G7biQo-d4ySnwE7MiXMcJHfLB1lttKm4xW8yxBlsbUkDaMN4jBQhmXtmrT2ckL4dRfmyEvw-eypdnY2fC3kVt775PbA7xC5TRp1cYz131amQHCpOHr',

                ),

                 const SizedBox(height: 32),

                // Past Purchases Section

                Row(

                  mainAxisAlignment: MainAxisAlignment.spaceBetween,

                  children: [

                    const Text('Past Purchases', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

                    TextButton(onPressed: () {}, child: const Text('View All', style: TextStyle(color: AppTheme.primary, fontSize: 13, fontWeight: FontWeight.bold))),

                  ],

                ),

                const SizedBox(height: 8),

                const _PastOrderCard(

                  title: 'Ergonomic Desk Lamp',

                  date: 'Oct 24, 2023',

                  status: 'COMPLETED',

                   statusColor: Color(0xFF64748B),

                ),

                const SizedBox(height: 12),

                 const _PastOrderCard(

                  title: 'Noise Cancelling Pods',

                  date: 'Oct 20, 2023',

                  status: 'CANCELLED',

                   statusColor: Colors.redAccent,

                ),

              ],

            ),

          ),

        ],

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2), // Assuming Orders is index 2

    );

  }

}

class _OrderTab extends StatelessWidget {

  final String label;

  final bool isActive;

  const _OrderTab({required this.label, this.isActive = false});

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

          fontWeight: isActive ? FontWeight.bold : FontWeight.w500,

          color: isActive ? AppTheme.primary : Colors.grey,

        ),

      ),

    );

  }

}

class _ActiveOrderCard extends StatelessWidget {

  final String title;

  final String location;

  final String price;

  final String imageUrl;

  const _ActiveOrderCard({

    required this.title,

    required this.location,

    required this.price,

    required this.imageUrl,

  });

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(

       padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? const Color(0xFF1E293B) : Color(0xFF64748B).withOpacity(0.05),

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: Colors.grey.withOpacity(0.1)),

      ),

      child: Column(

        children: [

          Row(

            children: [

               ClipRRect(

                borderRadius: BorderRadius.circular(8),

                child: Image.network(imageUrl, height: 80, width: 80, fit: BoxFit.cover),

              ),

              const SizedBox(width: 16),

              Expanded(

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                    Text(location, style: const TextStyle(fontSize: 11, color: Colors.grey)),

                    const SizedBox(height: 8),

                    Text('\$$price', style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 18)),

                  ],

                ),

              ),

            ],

          ),

          const SizedBox(height: 16),

          Row(

            children: [

              Expanded(

                child: ElevatedButton.icon(

                  onPressed: () {},

                   icon: const Icon(Icons.location_on, size: 16),

                  label: const Text('Track Order'),

                  style: ElevatedButton.styleFrom(

                    backgroundColor: AppTheme.primary,

                    foregroundColor: Colors.white,

                    padding: const EdgeInsets.symmetric(vertical: 12),

                    elevation: 0,

                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),

                  ),

                ),

              ),

              const SizedBox(width: 12),

              Expanded(

                child: OutlinedButton.icon(

                  onPressed: () {},

                  icon: const Icon(Icons.chat_bubble_outline, size: 16),

                  label: const Text('Contact Seller'),

                   style: OutlinedButton.styleFrom(

                    foregroundColor: isDark ? Colors.white : Colors.black87,

                    side: BorderSide(color: Colors.grey.withOpacity(0.3)),

                    padding: const EdgeInsets.symmetric(vertical: 12),

                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),

                  ),

                ),

              ),

            ],

          ),

        ],

      ),

    );

  }

}

class _PastOrderCard extends StatelessWidget {

  final String title;

  final String date;

  final String status;

  final Color statusColor;

  const _PastOrderCard({

    required this.title,

    required this.date,

    required this.status,

    required this.statusColor,

  });

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? const Color(0xFF1E293B) : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: Colors.grey.withOpacity(0.1)),

        boxShadow: [

           BoxShadow(

            color: Colors.black.withOpacity(0.02),

            blurRadius: 10,

            offset: const Offset(0, 4),

          ),

        ],

      ),

      child: Column(

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              Row(

                children: [

                  Container(

                    width: 48,

                    height: 48,

                    decoration: BoxDecoration(

                      color: Colors.grey.withOpacity(0.1),

                      borderRadius: BorderRadius.circular(8),

                    ),

                    child: const Icon(Icons.inventory_2_outlined, color: Colors.grey),

                  ),

                  const SizedBox(width: 12),

                  Column(

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),

                      Text('Delivered on $date', style: const TextStyle(fontSize: 11, color: Colors.grey)),

                    ],

                  ),

                ],

              ),

              Container(

                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

                decoration: BoxDecoration(

                   color: statusColor.withOpacity(0.1),

                  borderRadius: BorderRadius.circular(4),

                ),

                child: Text(status, style: TextStyle(color: statusColor, fontSize: 9, fontWeight: FontWeight.bold)),

              ),

            ],

          ),

           const SizedBox(height: 16),

          const Divider(height: 1, color: Color(0xFFF1F5F9)),

          const SizedBox(height: 12),

          Row(

            children: [

              Expanded(

                child: TextButton(

                  onPressed: () {},

                  child: const Text('Leave Review', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 12)),

                ),

              ),

              const SizedBox(width: 12),

               Expanded(

                child: TextButton(

                  onPressed: () {},

                  child: const Text('Reorder', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold, fontSize: 12)),

                ),

              ),

            ],

          ),

        ],

      ),

    );

  }

}
