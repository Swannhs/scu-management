
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class BillingSettingsScreen extends StatelessWidget {

  const BillingSettingsScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      appBar: AppBar(

        leading: IconButton(

          icon: const Icon(Icons.arrow_back),

          onPressed: () {},

        ),

        title: const Text('Billing & Subscriptions', style: TextStyle(fontWeight: FontWeight.bold)),

        centerTitle: true,

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.all(16.0),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              const Text('CURRENT PLAN', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Colors.grey, letterSpacing: 1.2)),

              const SizedBox(height: 12),

              Container(

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

                child: Row(

                  children: [

                    Expanded(

                      flex: 2,

                       child: Column(

                        crossAxisAlignment: CrossAxisAlignment.start,

                        children: [

                          Container(

                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 2),

                            decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),

                            child: const Text('ACTIVE', style: TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.1)),

                          ),

                          const SizedBox(height: 12),

                          const Text('Campus Premium', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),

                          const Text('\$9.99 / month • Renews Oct 24, 2023', style: TextStyle(fontSize: 12, color: Colors.grey)),

                           const SizedBox(height: 16),

                           ElevatedButton(

                              onPressed: () {},

                              child: const Text('Manage Plan'),

                              style: ElevatedButton.styleFrom(

                                backgroundColor: AppTheme.primary,

                                foregroundColor: Colors.white,

                                minimumSize: const Size(120, 36),

                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),

                                elevation: 0,

                              ),

                           ),

                        ],

                      ),

                    ),

                    const SizedBox(width: 16),

                    Expanded(

                      flex: 1,

                      child: Container(

                         height: 100,

                        decoration: BoxDecoration(

                           gradient: const LinearGradient(colors: [AppTheme.primary, Color(0xFF00FF9D)], begin: Alignment.topLeft, end: Alignment.bottomRight),

                           borderRadius: BorderRadius.circular(16),

                        ),

                        child: const Icon(Icons.workspace_premium, color: Colors.white, size: 48),

                      ),

                    ),

                  ],

                ),

              ),

              const SizedBox(height: 32),

              Row(

                mainAxisAlignment: MainAxisAlignment.spaceBetween,

                children: [

                   const Text('PAYMENT METHODS', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Colors.grey, letterSpacing: 1.2)),

                   TextButton.icon(

                      onPressed: () {},

                      icon: const Icon(Icons.add, size: 14),

                      label: const Text('Add New', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),

                      style: TextButton.styleFrom(foregroundColor: AppTheme.primary),

                   ),

                ],

              ),

              const SizedBox(height: 8),

              _PaymentMethodTile(

                title: 'Visa ending in 4242',

                subtitle: 'Expires 12/26',

                icon: Icons.credit_card,

                isSelected: true,

                iconColor: Colors.blueAccent,

              ),

               const SizedBox(height: 12),

               _PaymentMethodTile(

                title: 'PayPal',

                subtitle: 'alex.campus@email.com',

                icon: Icons.payments,

              ),

               const SizedBox(height: 32),

              const Text('BILLING HISTORY', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Colors.grey, letterSpacing: 1.2)),

              const SizedBox(height: 12),

              Container(

                 decoration: BoxDecoration(

                  color: isDark ? const Color(0xFF1E293B) : Colors.white,

                  borderRadius: BorderRadius.circular(16),

                  border: Border.all(color: AppTheme.primary.withOpacity(0.05)),

                ),

                child: Column(

                  children: [

                     const _BillingHistoryRow(

                      title: 'Campus Premium - Sept 2023',

                      date: 'Sept 24, 2023',

                      amount: '9.99',

                    ),

                     const _BillingHistoryRow(

                      title: 'Campus Premium - Aug 2023',

                      date: 'Aug 24, 2023',

                      amount: '9.99',

                    ),

                     const _BillingHistoryRow(

                      title: 'Campus Premium - July 2023',

                      date: 'July 24, 2023',

                      amount: '9.99',

                     ),

                  ],

                ),

              ),

              Center(

                 child: TextButton(

                    onPressed: () {},

                    child: const Text('View All History', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 14)),

                 ),

              ),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

    );

  }

}

class _PaymentMethodTile extends StatelessWidget {

  final String title;

  final String subtitle;

  final IconData icon;

  final bool isSelected;

  final Color? iconColor;

  const _PaymentMethodTile({

    required this.title,

    required this.subtitle,

    required this.icon,

    this.isSelected = false,

    this.iconColor,

  });

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? const Color(0xFF1E293B) : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: isSelected ? AppTheme.primary : AppTheme.primary.withOpacity(0.05)),

        boxShadow: [

           BoxShadow(

            color: Colors.black.withOpacity(0.02),

            blurRadius: 10,

            offset: const Offset(0, 4),

          ),

        ],

      ),

      child: Row(

        children: [

           Container(

            padding: const EdgeInsets.all(10),

            decoration: BoxDecoration(

              color: Colors.grey.withOpacity(0.1),

              borderRadius: BorderRadius.circular(8),

            ),

            child: Icon(icon, color: iconColor ?? Colors.grey),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                Text(subtitle, style: const TextStyle(fontSize: 11, color: Colors.grey)),

              ],

            ),

          ),

          if (isSelected)

            const Icon(Icons.check_circle, color: AppTheme.primary, size: 20)

          else

             const Icon(Icons.more_horiz, color: Colors.grey, size: 20),

        ],

      ),

    );

  }

}

class _BillingHistoryRow extends StatelessWidget {

  final String title;

  final String date;

  final String amount;

  const _BillingHistoryRow({

    required this.title,

    required this.date,

    required this.amount,

  });

  @override

  Widget build(BuildContext context) {

    return Column(

      children: [

        Padding(

          padding: const EdgeInsets.all(16.0),

          child: Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

               Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  Text(title, style: const TextStyle(fontWeight: FontWeight.w500, fontSize: 13)),

                  Text(date, style: const TextStyle(fontSize: 11, color: Colors.grey)),

                ],

              ),

               Column(

                crossAxisAlignment: CrossAxisAlignment.end,

                children: [

                  Text('\$$amount', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                  const Text('Invoice', style: TextStyle(color: AppTheme.primary, fontSize: 11, fontWeight: FontWeight.bold)),

                ],

              ),

            ],

          ),

        ),

        Divider(height: 1, color: Colors.grey.withOpacity(0.05), indent: 16, endIndent: 16),

      ],

    );

  }

}
