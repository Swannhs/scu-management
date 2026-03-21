
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class ApplicationSuccessScreen extends StatelessWidget {

  const ApplicationSuccessScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      appBar: AppBar(

        title: const Text('Submission Status', style: TextStyle(fontWeight: FontWeight.bold)),

        leading: IconButton(icon: const Icon(Icons.close), onPressed: () => Navigator.pop(context)),

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.symmetric(horizontal: 24.0),

          child: Column(

            children: [

              const SizedBox(height: 48),

              _buildSuccessIcon(),

              const SizedBox(height: 32),

              const Text('Application Submitted!', style: TextStyle(fontSize: 32, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -1)),

              const SizedBox(height: 16),

              Text(

                'Great work! Your contribution makes a real difference in our community.',

                textAlign: TextAlign.center,

                style: TextStyle(color: Colors.grey[500], fontSize: 16, height: 1.5),

              ),

              const SizedBox(height: 48),

              _buildSummaryCard(isDark),

              const SizedBox(height: 32),

              _buildNextStepsCard(isDark),

              const SizedBox(height: 48),

              _buildActionButtons(context, isDark),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

    );

  }

  Widget _buildSuccessIcon() {

    return Container(

      width: 100,

      height: 100,

      decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), shape: BoxShape.circle),

      child: Center(

        child: Container(

          width: 72,

          height: 72,

          decoration: BoxDecoration(color: AppTheme.primary, shape: BoxShape.circle),

          child: const Icon(Icons.check, color: Colors.white, size: 40),

        ),

      ),

    );

  }

  Widget _buildSummaryCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(32),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  const Text('SELECTED SERVICE', style: TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

                  const SizedBox(height: 8),

                  const Text('City Park Restoration', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),

                ],

              ),

              Container(padding: const EdgeInsets.all(12), decoration: BoxDecoration(color: Colors.green[50], borderRadius: BorderRadius.circular(16)), child: const Icon(Icons.park, color: AppTheme.primary)),

            ],

          ),

          const SizedBox(height: 24),

          _buildSummaryItem(Icons.calendar_today, 'Saturday, Oct 24 • 09:00 AM'),

          const SizedBox(height: 12),

          _buildSummaryItem(Icons.location_on, 'Central Park, North Entrance'),

          const SizedBox(height: 24),

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              _buildAvatarsRow(),

              Container(

                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

                decoration: BoxDecoration(color: Colors.grey[100], borderRadius: BorderRadius.circular(8)),

                child: const Text('VOLUNTEER TEAM', style: TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold)),

              ),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildSummaryItem(IconData icon, String text) {

    return Row(

      children: [

        Icon(icon, size: 16, color: Colors.grey),

        const SizedBox(width: 12),

        Text(text, style: TextStyle(color: Colors.grey[600], fontSize: 14)),

      ],

    );

  }

  Widget _buildAvatarsRow() {

    return Row(

      children: [

        for (int i = 0; i < 3; i++)

          Align(

            widthFactor: 0.7,

            child: CircleAvatar(

              radius: 14,

              backgroundColor: Colors.white,

              child: CircleAvatar(radius: 12, backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=user$i')),

            ),

          ),

        const SizedBox(width: 12),

        Text('+12', style: TextStyle(color: Colors.grey[400], fontSize: 11, fontWeight: FontWeight.bold)),

      ],

    );

  }

  Widget _buildNextStepsCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.grey[50],

        borderRadius: BorderRadius.circular(24),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            children: [

              const Icon(Icons.info, color: AppTheme.primary, size: 20),

              const SizedBox(width: 12),

              const Text('What happens next?', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

            ],

          ),

          const SizedBox(height: 24),

          _buildStepItem('1', 'Coordinator Review', 'Usually takes 2-3 business days. We check all volunteer credentials.', true),

          const SizedBox(height: 16),

          _buildStepItem('2', 'Orientation Invite', 'Once approved, you\'ll receive a digital welcome kit via email.', false),

        ],

      ),

    );

  }

  Widget _buildStepItem(String number, String title, String subtitle, bool isCurrent) {

    return Row(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Container(

          width: 28,

          height: 28,

          decoration: BoxDecoration(color: isCurrent ? AppTheme.primary : Colors.grey[300], shape: BoxShape.circle),

          child: Center(child: Text(number, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13))),

        ),

        const SizedBox(width: 16),

        Expanded(

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),

              const SizedBox(height: 4),

              Text(subtitle, style: TextStyle(color: Colors.grey[500], fontSize: 12, height: 1.4)),

            ],

          ),

        ),

      ],

    );

  }

  Widget _buildActionButtons(BuildContext context, bool isDark) {

    return Column(

      children: [

        ElevatedButton(

          onPressed: () {

            Navigator.pushNamed(context, '/submission-status');

          },

          style: ElevatedButton.styleFrom(

            backgroundColor: AppTheme.primary,

            foregroundColor: Colors.white,

            minimumSize: const Size(double.infinity, 64),

            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),

            elevation: 0,

          ),

          child: const Text('View Application Status', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

        ),

        const SizedBox(height: 16),

        TextButton(

          onPressed: () {

            Navigator.popUntil(context, ModalRoute.withName('/'));

          },

          style: TextButton.styleFrom(

            backgroundColor: isDark ? Colors.white.withOpacity(0.05) : Colors.white,

            minimumSize: const Size(double.infinity, 64),

            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20), side: BorderSide(color: Colors.grey[200]!)),

          ),

          child: Text('Back to Home', style: TextStyle(color: isDark ? Colors.white : Colors.black87, fontWeight: FontWeight.bold, fontSize: 16)),

        ),

      ],

    );

  }

}
