
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class SubmitProofStep2Screen extends StatefulWidget {

  const SubmitProofStep2Screen({super.key});

  @override

  State<SubmitProofStep2Screen> createState() => _SubmitProofStep2ScreenState();

}

class _SubmitProofStep2ScreenState extends State<SubmitProofStep2Screen> {

  bool _isConfirmed = false;

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      appBar: AppBar(

        title: const Text('Submit Proof', style: TextStyle(fontWeight: FontWeight.bold)),

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        actions: [

          IconButton(icon: const Icon(Icons.help_outline), onPressed: () {}),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.all(24.0),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              Text(

                'STEP 2 OF 2',

                style: TextStyle(color: AppTheme.primary, fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1),

              ),

              const SizedBox(height: 8),

              Row(

                mainAxisAlignment: MainAxisAlignment.spaceBetween,

                children: [

                  const Text('Summary', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),

                  _buildProgressBar(),

                ],

              ),

              const SizedBox(height: 32),

              _buildSummarySection(isDark),

              const SizedBox(height: 32),

              _buildAcknowledgementSection(isDark),

              const SizedBox(height: 48),

              _buildActionButtons(isDark),

              const SizedBox(height: 40),

            ],

          ),

        ),

      ),

    );

  }

  Widget _buildProgressBar() {

    return Row(

      children: [

        Container(width: 48, height: 6, decoration: BoxDecoration(color: AppTheme.primary, borderRadius: BorderRadius.circular(3))),

      ],

    );

  }

  Widget _buildSummarySection(bool isDark) {

    return Container(

      width: double.infinity,

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [

          BoxShadow(

            color: Colors.black.withOpacity(0.02),

            blurRadius: 20,

            offset: const Offset(0, 10),

          ),

        ],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          _buildSummaryItem('PROJECT', 'Campus Food Bank', Icons.volunteer_activism),

          const Divider(height: 32),

          _buildSummaryItem('DATE', 'Oct 24, 2023', Icons.calendar_today),

          const Divider(height: 32),

          const Text('SUBMISSION CONTENT', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

          const SizedBox(height: 12),

          Row(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              Container(

                width: 80,

                height: 80,

                decoration: BoxDecoration(

                  borderRadius: BorderRadius.circular(12),

                  image: const DecorationImage(

                    image: NetworkImage('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=200'),

                    fit: BoxFit.cover,

                  ),

                ),

              ),

              const SizedBox(width: 16),

              Expanded(

                child: Text(

                  "I helped organize over 200 food parcels for the local community today. It was a great experience working with everyone.",

                  style: TextStyle(color: Colors.grey[600], fontSize: 13, height: 1.5),

                  maxLines: 3,

                  overflow: TextOverflow.ellipsis,

                ),

              ),

            ],

          ),

          const Divider(height: 32),

          Row(

            children: [

              _buildSmallStat('HOURS', '4.5 Hours', Icons.timer),

              const SizedBox(width: 32),

              _buildSmallStat('IMPACT', 'Direct Aid', Icons.favorite),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildSummaryItem(String label, String value, IconData icon) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Text(label, style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

        const SizedBox(height: 8),

        Row(

          children: [

            Icon(icon, size: 16, color: AppTheme.primary),

            const SizedBox(width: 8),

            Text(value, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),

          ],

        ),

      ],

    );

  }

  Widget _buildSmallStat(String label, String value, IconData icon) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Text(label, style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

        const SizedBox(height: 4),

        Row(

          children: [

            Icon(icon, size: 14, color: AppTheme.primary),

            const SizedBox(width: 4),

            Text(value, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),

          ],

        ),

      ],

    );

  }

  Widget _buildAcknowledgementSection(bool isDark) {

    return Row(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Checkbox(

          value: _isConfirmed,

          onChanged: (val) => setState(() => _isConfirmed = val!),

          activeColor: AppTheme.primary,

          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),

        ),

        const Expanded(

          child: Padding(

            padding: EdgeInsets.only(top: 8.0),

            child: Text(

              "I confirm that the information provided is accurate and represents my actual service hours.",

              style: TextStyle(fontSize: 13, height: 1.4, fontWeight: FontWeight.w500),

            ),

          ),

        ),

      ],

    );

  }

  Widget _buildActionButtons(bool isDark) {

    return Column(

      children: [

        ElevatedButton(

          onPressed: _isConfirmed ? () => _showSuccessDialog() : null,

          style: ElevatedButton.styleFrom(

            backgroundColor: AppTheme.primary,

            foregroundColor: Colors.white,

            minimumSize: const Size(double.infinity, 56),

            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

            elevation: 0,

            disabledBackgroundColor: Colors.grey[300],

          ),

          child: const Text('Submit Verification Request', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

        ),

        const SizedBox(height: 16),

        OutlinedButton(

          onPressed: () => Navigator.pop(context),

          style: OutlinedButton.styleFrom(

            foregroundColor: AppTheme.primary,

            side: const BorderSide(color: AppTheme.primary),

            minimumSize: const Size(double.infinity, 56),

            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

          ),

          child: const Text('Edit Details', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

        ),

      ],

    );

  }

  void _showSuccessDialog() {

    showDialog(

      context: context,

      builder: (context) => AlertDialog(

        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),

        content: Column(

          mainAxisSize: MainAxisSize.min,

          children: [

            const SizedBox(height: 16),

            Container(

              padding: const EdgeInsets.all(16),

              decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), shape: BoxShape.circle),

              child: const Icon(Icons.check_circle, color: AppTheme.primary, size: 48),

            ),

            const SizedBox(height: 24),

            const Text('Submission Received!', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),

            const SizedBox(height: 8),

            Text(

              'Your service proof has been submitted and is currently pending verification.',

              textAlign: TextAlign.center,

              style: TextStyle(color: Colors.grey[500], fontSize: 14),

            ),

            const SizedBox(height: 32),

            ElevatedButton(

              onPressed: () {

                Navigator.pop(context); // Close dialog

                Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false); // Go home

              },

              style: ElevatedButton.styleFrom(

                backgroundColor: AppTheme.primary,

                minimumSize: const Size(double.infinity, 50),

                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

              ),

              child: const Text('Back to Dashboard', style: TextStyle(fontWeight: FontWeight.bold)),

            ),

          ],

        ),

      ),

    );

  }

}
