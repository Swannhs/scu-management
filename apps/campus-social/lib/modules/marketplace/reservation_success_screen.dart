
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class ReservationSuccessScreen extends StatelessWidget {

  const ReservationSuccessScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      appBar: AppBar(

        backgroundColor: Colors.transparent,

        elevation: 0,

        leading: IconButton(

          icon: Icon(Icons.close, color: isDark ? Colors.white : Colors.black),

          onPressed: () => Navigator.pop(context),

        ),

        title: const Text('Reservation', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

        centerTitle: true,

        actions: [

          IconButton(

            icon: Icon(Icons.share, color: isDark ? Colors.white : Colors.black),

            onPressed: () {},

          ),

        ],

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.symmetric(horizontal: 24),

          child: Column(

            children: [

              const SizedBox(height: 32),

              _buildSuccessIcon(),

              const SizedBox(height: 24),

              const Text(

                'Book Reserved!',

                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),

              ),

              const SizedBox(height: 8),

              Text(

                '\'The Psychology of Money\' has been held for you at the library.',

                textAlign: TextAlign.center,

                style: TextStyle(color: isDark ? Colors.white60 : Colors.black54, fontSize: 14),

              ),

              const SizedBox(height: 40),

              _buildQRCodeCard(isDark),

              const SizedBox(height: 32),

              const Align(

                alignment: Alignment.centerLeft,

                child: Text('Pickup Information', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

              ),

              const SizedBox(height: 16),

              _buildLocationCard(isDark),

              const SizedBox(height: 16),

              _buildDateTimeCard(isDark),

              const SizedBox(height: 48),

              _buildActionButtons(context, isDark),

              const SizedBox(height: 32),

            ],

          ),

        ),

      ),

    );

  }

  Widget _buildSuccessIcon() {

    return Stack(

      alignment: Alignment.center,

      children: [

        Container(

          width: 120,

          height: 120,

          decoration: BoxDecoration(

            color: AppTheme.primary.withOpacity(0.1),

            shape: BoxShape.circle,

          ),

        ),

        const Icon(Icons.check_circle, color: AppTheme.primary, size: 80),

      ],

    );

  }

  Widget _buildQRCodeCard(bool isDark) {

    return Container(

      width: double.infinity,

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        border: Border.all(color: Colors.grey.withOpacity(0.1)),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Column(

        children: [

          Container(

            padding: const EdgeInsets.all(16),

            decoration: BoxDecoration(

              color: isDark ? Colors.white10 : Colors.grey[50],

              borderRadius: BorderRadius.circular(16),

            ),

            child: Image.network(

              'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=LIB-8829-X',

              width: 150,

              height: 150,

            ),

          ),

          const SizedBox(height: 16),

          Text(

            'PICKUP ID',

            style: TextStyle(color: Colors.grey[500], fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 2),

          ),

          const SizedBox(height: 4),

          const Text(

            '#LIB-8829-X',

            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, fontFamily: 'monospace'),

          ),

        ],

      ),

    );

  }

  Widget _buildLocationCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

        border: Border.all(color: Colors.grey.withOpacity(0.1)),

      ),

      child: Row(

        children: [

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                const Text('Central Campus Library', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

                const SizedBox(height: 4),

                const Text('Level 2, Service Desk A', style: TextStyle(color: AppTheme.primary, fontSize: 14)),

                const SizedBox(height: 12),

                ElevatedButton.icon(

                  onPressed: () {},

                  icon: const Icon(Icons.directions, size: 18),

                  label: const Text('Get Directions'),

                  style: ElevatedButton.styleFrom(

                    backgroundColor: AppTheme.primary.withOpacity(0.1),

                    foregroundColor: AppTheme.primary,

                    elevation: 0,

                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

                  ),

                ),

              ],

            ),

          ),

          const SizedBox(width: 12),

          ClipRRect(

            borderRadius: BorderRadius.circular(12),

            child: Image.network(

              'https://images.unsplash.com/photo-1544383335-c533fd093223?w=200',

              width: 80,

              height: 80,

              fit: BoxFit.cover,

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildDateTimeCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

        border: Border.all(color: Colors.grey.withOpacity(0.1)),

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.all(12),

            decoration: BoxDecoration(

              color: AppTheme.primary.withOpacity(0.1),

              borderRadius: BorderRadius.circular(12),

            ),

            child: const Icon(Icons.calendar_today, color: AppTheme.primary),

          ),

          const SizedBox(width: 16),

          const Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text('AVAILABILITY DATE', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold)),

                SizedBox(height: 4),

                Text('Oct 24, 2023 • 10:30 AM', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),

              ],

            ),

          ),

          const Icon(Icons.event_available, color: AppTheme.primary),

        ],

      ),

    );

  }

  Widget _buildActionButtons(BuildContext context, bool isDark) {

    return Column(

      children: [

        SizedBox(

          width: double.infinity,

          height: 56,

          child: ElevatedButton.icon(

            onPressed: () {},

            icon: const Icon(Icons.calendar_month),

            label: const Text('Add to Calendar'),

            style: ElevatedButton.styleFrom(

              backgroundColor: AppTheme.primary,

              foregroundColor: Colors.white,

              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

              elevation: 4,

            ),

          ),

        ),

        const SizedBox(height: 12),

        SizedBox(

          width: double.infinity,

          height: 56,

          child: OutlinedButton(

            onPressed: () => Navigator.pushReplacementNamed(context, '/library-history'),

            style: OutlinedButton.styleFrom(

              side: BorderSide(color: isDark ? Colors.white10 : Colors.black12),

              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

              foregroundColor: isDark ? Colors.white : Colors.black,

            ),

            child: const Text('View My Reservations'),

          ),

        ),

      ],

    );

  }

}
