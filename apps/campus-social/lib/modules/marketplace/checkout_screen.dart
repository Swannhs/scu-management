
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class CheckoutScreen extends StatelessWidget {

  const CheckoutScreen({super.key});

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

              child: SingleChildScrollView(

                child: Padding(

                  padding: const EdgeInsets.all(16.0),

                  child: Column(

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      _buildOrderSummary(isDark),

                      const SizedBox(height: 24),

                      _buildPickupLocation(isDark),

                      const SizedBox(height: 24),

                      _buildPaymentMethod(isDark),

                      const SizedBox(height: 32),

                      _buildSecurityBadges(isDark),

                      const SizedBox(height: 32),

                      _buildActionButtons(isDark),

                    ],

                  ),

                ),

              ),

            ),

          ],

        ),

      ),

    );

  }

  Widget _buildHeader(BuildContext context, bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),

      decoration: BoxDecoration(border: Border(bottom: BorderSide(color: AppTheme.primary.withOpacity(0.1)))),

      child: Stack(

        alignment: Alignment.center,

        children: [

          Align(

            alignment: Alignment.centerLeft,

            child: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

          ),

          const Text('Checkout', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

        ],

      ),

    );

  }

  Widget _buildOrderSummary(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Row(

          mainAxisAlignment: MainAxisAlignment.spaceBetween,

          children: [

            const Text('Order Summary', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),

            Text('1 Item', style: TextStyle(color: AppTheme.primary, fontSize: 13, fontWeight: FontWeight.w500)),

          ],

        ),

        const SizedBox(height: 12),

        Container(

          padding: const EdgeInsets.all(12),

          decoration: BoxDecoration(

            color: isDark ? AppTheme.cardDark : Colors.white,

            borderRadius: BorderRadius.circular(16),

            border: Border.all(color: AppTheme.primary.withOpacity(0.05)),

          ),

          child: Row(

            children: [

              ClipRRect(

                borderRadius: BorderRadius.circular(12),

                child: Image.network(r'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200', width: 64, height: 64, fit: BoxFit.cover),

              ),

              const SizedBox(width: 16),

              const Expanded(

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Text('Vintage Campus Hoodie', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),

                    Text('Size: M | Color: Forest Green', style: TextStyle(color: Colors.grey, fontSize: 13)),

                  ],

                ),

              ),

              const Text('\$45.00', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),

            ],

          ),

        ),

        const SizedBox(height: 16),

        _buildSummaryRow('Subtotal', '\$45.00', false),

        _buildSummaryRow('Service Fee', '\$1.50', false),

        Padding(

          padding: EdgeInsets.symmetric(vertical: 8),

          child: Divider(height: 1),

        ),

        _buildSummaryRow('Total', '\$46.50', true),

      ],

    );

  }

  Widget _buildSummaryRow(String label, String value, bool isTotal) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.spaceBetween,

      children: [

        Text(label, style: TextStyle(color: isTotal ? null : Colors.grey, fontSize: isTotal ? 16 : 14, fontWeight: isTotal ? FontWeight.bold : FontWeight.normal)),

        Text(value, style: TextStyle(color: isTotal ? AppTheme.primary : null, fontSize: isTotal ? 16 : 14, fontWeight: FontWeight.bold)),

      ],

    );

  }

  Widget _buildPickupLocation(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        const Text('Pickup Location', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),

        const SizedBox(height: 12),

        _buildLocationCard('Student Union', 'Main Entrance, North Wing', Icons.school, true, isDark),

        const SizedBox(height: 8),

        _buildLocationCard('Main Library', 'Information Desk', Icons.menu_book, false, isDark),

      ],

    );

  }

  Widget _buildLocationCard(String title, String sub, IconData icon, bool selected, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: selected ? AppTheme.primary : AppTheme.primary.withOpacity(0.1), width: selected ? 2 : 1),

      ),

      child: Row(

        children: [

          Icon(icon, color: selected ? AppTheme.primary : Colors.grey, size: 24),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                Text(sub, style: TextStyle(color: Colors.grey, fontSize: 12)),

              ],

            ),

          ),

          if (selected) const Icon(Icons.check_circle, color: AppTheme.primary, size: 20),

        ],

      ),

    );

  }

  Widget _buildPaymentMethod(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        const Text('Payment Method', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),

        const SizedBox(height: 12),

        Container(

          padding: const EdgeInsets.all(16),

          decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(16), border: Border.all(color: AppTheme.primary.withOpacity(0.2))),

          child: Row(

            children: [

              const Icon(Icons.token, color: AppTheme.primary, size: 24),

              const SizedBox(width: 16),

              const Expanded(

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Text('Campus Points', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                    Text('Balance: 124.50 pts', style: TextStyle(color: AppTheme.primary, fontSize: 12, fontWeight: FontWeight.w500)),

                  ],

                ),

              ),

              Container(

                width: 20,

                height: 20,

                decoration: BoxDecoration(shape: BoxShape.circle, border: Border.all(color: AppTheme.primary, width: 2)),

                child: Center(child: Container(width: 10, height: 10, decoration: BoxDecoration(color: AppTheme.primary, shape: BoxShape.circle))),

              ),

            ],

          ),

        ),

        const SizedBox(height: 12),

        Row(

          children: [

            Expanded(child: _buildShortPaymentOption('Credit Card', Icons.credit_card, isDark)),

            const SizedBox(width: 12),

            Expanded(child: _buildShortPaymentOption('Apple Pay', Icons.apple, isDark)),

          ],

        ),

      ],

    );

  }

  Widget _buildShortPaymentOption(String label, IconData icon, bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(vertical: 12),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(12),

        border: Border.all(color: AppTheme.primary.withOpacity(0.1)),

      ),

      child: Column(

        children: [

          Icon(icon, color: Colors.grey, size: 20),

          const SizedBox(height: 4),

          Text(label.toUpperCase(), style: const TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 0.5)),

        ],

      ),

    );

  }

  Widget _buildSecurityBadges(bool isDark) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.center,

      children: [

        Icon(Icons.verified_user, size: 12, color: Colors.grey.withOpacity(0.6)),

        const SizedBox(width: 4),

        Text('SECURE SSL', style: TextStyle(color: Colors.grey.withOpacity(0.6), fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 1)),

        const SizedBox(width: 16),

        Icon(Icons.shield, size: 12, color: Colors.grey.withOpacity(0.6)),

        const SizedBox(width: 4),

        Text('ENCRYPTED', style: TextStyle(color: Colors.grey.withOpacity(0.6), fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 1)),

      ],

    );

  }

  Widget _buildActionButtons(bool isDark) {

    return Column(

      children: [

        ElevatedButton(

          onPressed: () {},

          style: ElevatedButton.styleFrom(

            backgroundColor: AppTheme.primary,

            foregroundColor: Colors.white,

            padding: const EdgeInsets.symmetric(vertical: 16),

            minimumSize: const Size(double.infinity, 56),

            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

            elevation: 8,

            shadowColor: AppTheme.primary.withOpacity(0.4),

          ),

          child: Row(

            mainAxisAlignment: MainAxisAlignment.center,

            children: [

              Icon(Icons.shopping_bag_outlined),

              SizedBox(width: 8),

              Text('Complete Purchase • \$46.50', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

            ],

          ),

        ),

        const SizedBox(height: 16),

        Padding(

          padding: EdgeInsets.symmetric(horizontal: 16),

          child: Text(

            'By clicking "Complete Purchase", you agree to the Campus Social Marketplace terms of service and seller policies.',

            style: TextStyle(color: Colors.grey, fontSize: 10),

            textAlign: TextAlign.center,

          ),

        ),

      ],

    );

  }

}
