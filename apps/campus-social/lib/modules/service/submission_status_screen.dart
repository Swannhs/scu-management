
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class SubmissionStatusScreen extends StatelessWidget {

  const SubmissionStatusScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      appBar: AppBar(

        title: const Text('Submission Status', style: TextStyle(fontWeight: FontWeight.bold)),

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        actions: [

          IconButton(icon: const Icon(Icons.more_vert), onPressed: () {}),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.all(24.0),

          child: Column(

            children: [

              _buildCurrentStatusCard(isDark),

              const SizedBox(height: 32),

              _buildVerificationJourney(isDark),

              const SizedBox(height: 32),

              _buildServiceDetails(isDark),

              const SizedBox(height: 32),

              _buildCoordinatorNotes(isDark),

              const SizedBox(height: 48),

              ElevatedButton(

                onPressed: () => Navigator.pop(context),

                style: ElevatedButton.styleFrom(

                  backgroundColor: AppTheme.primary,

                  foregroundColor: Colors.white,

                  minimumSize: const Size(double.infinity, 64),

                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),

                  elevation: 0,

                ),

                child: Row(

                  mainAxisAlignment: MainAxisAlignment.center,

                  children: const [

                    Text('Back to Dashboard', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

                    SizedBox(width: 12),

                    Icon(Icons.home, size: 20),

                  ],

                ),

              ),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2),

    );

  }

  Widget _buildCurrentStatusCard(bool isDark) {

    return Container(

      width: double.infinity,

      padding: const EdgeInsets.all(32),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(32),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Column(

        children: [

          Container(

            padding: const EdgeInsets.all(16),

            decoration: BoxDecoration(color: Colors.red[50], shape: BoxShape.circle),

            child: const Icon(Icons.more_horiz, color: Colors.red, size: 32),

          ),

          const SizedBox(height: 24),

          const Text('CURRENT STATUS', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

          const SizedBox(height: 8),

          const Text('Under Review', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: Colors.red, fontFamily: 'Public Sans')),

          const SizedBox(height: 12),

          Text(

            'Your submission is currently being reviewed by the coordinator.',

            textAlign: TextAlign.center,

            style: TextStyle(color: Colors.grey[500], fontSize: 14, height: 1.5),

          ),

        ],

      ),

    );

  }

  Widget _buildVerificationJourney(bool isDark) {

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

              const Icon(Icons.show_chart, color: AppTheme.primary, size: 20),

              const SizedBox(width: 12),

              const Text('Verification Journey', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

            ],

          ),

          const SizedBox(height: 32),

          _buildJourneyStep(

            'Proof Submitted',

            'Oct 24, 2023 • 09:45 AM',

            isCompleted: true,

            isCurrent: false,

            showLine: true,

          ),

          _buildJourneyStep(

            'Coordinator Review',

            'In Progress',

            isCompleted: false,

            isCurrent: true,

            showLine: true,

          ),

          _buildJourneyStep(

            'Final Verification',

            'Pending review',

            isCompleted: false,

            isCurrent: false,

            showLine: false,

          ),

        ],

      ),

    );

  }

  Widget _buildJourneyStep(String title, String subtitle, {required bool isCompleted, required bool isCurrent, required bool showLine}) {

    return IntrinsicHeight(

      child: Row(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Column(

            children: [

              Container(

                width: 24,

                height: 24,

                decoration: BoxDecoration(

                  color: isCompleted ? AppTheme.primary : (isCurrent ? Colors.red[100] : Colors.grey[200]),

                  shape: BoxShape.circle,

                ),

                child: Center(

                  child: isCompleted

                      ? const Icon(Icons.check, size: 14, color: Colors.white)

                      : (isCurrent

                          ? Container(width: 8, height: 8, decoration: BoxDecoration(color: Colors.red, shape: BoxShape.circle))

                          : Container(width: 6, height: 6, decoration: BoxDecoration(color: Colors.grey, shape: BoxShape.circle))),

                ),

              ),

              if (showLine)

                Expanded(

                  child: Container(width: 2, color: isCompleted ? AppTheme.primary : Colors.grey[200]),

                ),

            ],

          ),

          const SizedBox(width: 16),

          Padding(

            padding: const EdgeInsets.only(bottom: 24.0),

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(title, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: isCurrent ? Colors.black : (isCompleted ? Colors.black : Colors.grey))),

                const SizedBox(height: 4),

                Text(subtitle, style: TextStyle(color: Colors.grey[500], fontSize: 12)),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildServiceDetails(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          const Text('Service Details', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

          const SizedBox(height: 24),

          Row(

            children: [

              Container(

                padding: const EdgeInsets.all(10),

                decoration: BoxDecoration(color: Colors.green[50], borderRadius: BorderRadius.circular(12)),

                child: const Icon(Icons.park, color: AppTheme.primary),

              ),

              const SizedBox(width: 16),

              Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  Text('Service Name', style: TextStyle(color: Colors.grey[400], fontSize: 10, fontWeight: FontWeight.bold)),

                  const Text('City Park Restoration', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                ],

              ),

            ],

          ),

          const SizedBox(height: 20),

          Row(

            children: [

              Expanded(

                child: Container(

                  padding: const EdgeInsets.all(16),

                  decoration: BoxDecoration(color: Colors.grey[50], borderRadius: BorderRadius.circular(16)),

                  child: Column(

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      Text('DATE SUBMITTED', style: TextStyle(color: Colors.grey[500], fontSize: 9, fontWeight: FontWeight.bold)),

                      const SizedBox(height: 8),

                      Row(

                        children: const [

                          Icon(Icons.calendar_today, size: 14, color: Colors.blueGrey),

                          SizedBox(width: 8),

                          Text('Oct 24, 2023', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),

                        ],

                      ),

                    ],

                  ),

                ),

              ),

              const SizedBox(width: 16),

              Expanded(

                child: Container(

                  padding: const EdgeInsets.all(16),

                  decoration: BoxDecoration(color: Colors.grey[50], borderRadius: BorderRadius.circular(16)),

                  child: Column(

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      Text('HOURS LOGGED', style: TextStyle(color: Colors.grey[500], fontSize: 9, fontWeight: FontWeight.bold)),

                      const SizedBox(height: 8),

                      Row(

                        children: const [

                          Icon(Icons.access_time, size: 14, color: Colors.blueGrey),

                          SizedBox(width: 8),

                          Text('4.5 Hours', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),

                        ],

                      ),

                    ],

                  ),

                ),

              ),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildCoordinatorNotes(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.grey[50],

        borderRadius: BorderRadius.circular(24),

        border: Border(left: BorderSide(color: AppTheme.primary, width: 4)),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            children: [

              const Icon(Icons.chat_bubble, color: Colors.grey, size: 18),

              const SizedBox(width: 12),

              Text('COORDINATOR NOTES', style: TextStyle(color: Colors.grey[600], fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5)),

            ],

          ),

          const SizedBox(height: 12),

          Text(

            '"Please clarify the tasks performed in the reflection section. Ensure your photo clearly shows the finished area."',

            style: TextStyle(fontSize: 14, height: 1.6, fontStyle: FontStyle.italic, color: isDark ? Colors.white70 : Colors.black87),

          ),

        ],

      ),

    );

  }

}
