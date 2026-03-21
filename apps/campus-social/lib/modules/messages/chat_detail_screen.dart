
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class ChatDetailScreen extends StatelessWidget {

  const ChatDetailScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      appBar: AppBar(

        title: Row(

          children: [

            IconButton(

              icon: const Icon(Icons.arrow_back),

              onPressed: () {},

            ),

            Stack(

              children: [

                CircleAvatar(

                  radius: 20,

                  backgroundImage: NetworkImage('https://lh3.googleusercontent.com/aida-public/AB6AXuDbLqW4y5Db4PnAeT61RHwPxxZqSVs2yGn_7oIjYOoCO46cQ-HJVm-5JyXBooLnpkIV0eGmTNmvoQ9EZTFqQX2J7YqmFTYRCZfH_TKtjKJAsl7SGFehrH3al9IbzFi3EKXfawKWstLbbNF6WrUQriuR1LnxjpNPpcFXlu1KowA_gTOLDG8-HcELTsYaBv6L-INZ98IM2WwmDN7fO9F2v-z4c_m3m6IZ6mpnr6Cc7bqpFLv9z0YT4Rs2SKg3SU75RIs-GsRr6VpEXDOU'),

                ),

                Positioned(

                  bottom: 0,

                  right: 0,

                  child: Container(

                    width: 12,

                    height: 12,

                    decoration: BoxDecoration(

                      color: AppTheme.primary,

                      shape: BoxShape.circle,

                      border: Border.all(color: Colors.white, width: 2),

                    ),

                  ),

                ),

              ],

            ),

            const SizedBox(width: 12),

            Column(

              crossAxisAlignment: CrossAxisAlignment.start,

               mainAxisSize: MainAxisSize.min,

              children: [

                Text(

                  'Alex Rivera',

                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),

                ),

                Text(

                  'Online',

                  style: TextStyle(fontSize: 10, color: AppTheme.primary, fontWeight: FontWeight.bold),

                ),

              ],

            ),

          ],

        ),

        actions: [

          IconButton(icon: const Icon(Icons.videocam_outlined), onPressed: () {}),

          IconButton(icon: const Icon(Icons.call_outlined), onPressed: () {}),

          IconButton(icon: const Icon(Icons.more_vert), onPressed: () {}),

        ],

      ),

      body: Column(

        children: [

          Expanded(

            child: ListView(

              padding: const EdgeInsets.all(16),

              children: [

                Center(

                  child: Container(

                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),

                    decoration: BoxDecoration(

                      color: AppTheme.primary.withOpacity(0.05),

                      borderRadius: BorderRadius.circular(20),

                    ),

                    child: const Text(

                      'TODAY',

                      style: TextStyle(

                        fontSize: 10,

                        fontWeight: FontWeight.bold,

                        color: AppTheme.primary,

                        letterSpacing: 1.2,

                      ),

                    ),

                  ),

                ),

                const SizedBox(height: 24),

                // Incoming Message

                const _ChatMessage(

                  message: 'Hey! Did you check the notes for the project? We need to submit by 5 PM.',

                  time: '10:24 AM',

                  isMe: false,

                  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDznfOOJtPeZ3-dxQnZMXLMpX0BtdKzJ0CJXrpRarG87Z94BlUIkzbu9FkxApu_5hKPs7xfIO-MfIiwRv-iSI9RyPQKThg5-dKWIHe_RolVyt34b5eKThvi0F77gPKWIreM8zUKZCgQ5O_GReske9xb4Hrgf41Tot2iQpgQEuLdeOha4e4HUE795t81JpYcwjPyps1OCdAtR9h_V2zVP0NtzLm6wLeHO6Nvf4q368N0VZJk5VcIZZtERW6JW7KD_vCPNxcKFO7U1As4',

                ),

                // Outgoing Message

                const _ChatMessage(

                  message: 'Not yet, I\'ll check them in a bit. Just finished the lecture.',

                  time: '10:26 AM',

                  isMe: true,

                  isRead: true,

                ),

                // Incoming Message with Image

                const _ChatMessage(

                   message: 'I just sent over the reference image we discussed.',

                   time: '10:28 AM',

                   isMe: false,

                   attachmentUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBndAbdbrTn_Obk6NJvfJ8Yy0rmHoIP-GiAZHXdMCRNvrWL_1pTeWddzDTMbU9PMB1HlVYNgaoSBq1p666s_CTmyvkcDq1bla1CcXM_SVn5W_uVpzJ1P2clbyt5VrxQGMczHCQAiUGUo5xDiKdO46acPJE2pxuNpY00faRHwzsN0gsVcjvAo1w4r_S-BYwM2VWzmGzgX5I6-6DXDBEDYN8zCtrZyO7mXfXDa3Jd8GDemkEF-PRIXiCEkwOZhE46CKXKRufv4Tz0K2CB',

                   imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCR6cwukh_1kZMF5oVu82fSbcFYXt_SynlhMKjG-O0XRyFFJHT3-D_h_Rh7zWpLGTsAkEjXPri_Z51C7qM_a4YmWAAGVn20fRF5pxQpf01w7HzEPoukWt9Ghe2J-dUyAusLoh-RB8rQ7vEzhn8wIvBFHkuZ4-nIWwmmnkGK8_pCZSFcqWEC3JYci8X2oQFqMthckgm_JAT5dVuUuu35hlTl300TlJ9OK37QZ3xOa5OIT9aQ_CkOXpRSY91KryLspFqM-RTMmaYbTExu',

                ),

                // Outgoing Message Short

                const _ChatMessage(

                  message: 'Perfect, looks good! 🙌',

                  time: '10:30 AM',

                  isMe: true,

                  isRead: true,

                ),

              ],

            ),

          ),

          // Bottom Input Area

          Container(

            padding: const EdgeInsets.fromLTRB(16, 16, 16, 40),

            decoration: BoxDecoration(

              color: isDark ? const Color(0xFF0F231C) : Colors.white,

              border: Border(top: BorderSide(color: AppTheme.primary.withOpacity(0.1))),

            ),

            child: Row(

              children: [

                 Container(

                  width: 40,

                  height: 40,

                  decoration: BoxDecoration(

                    color: AppTheme.primary.withOpacity(0.1),

                    shape: BoxShape.circle,

                  ),

                  child: const Icon(Icons.add, color: AppTheme.primary),

                ),

                const SizedBox(width: 8),

                Expanded(

                  child: Container(

                     padding: const EdgeInsets.symmetric(horizontal: 16),

                    decoration: BoxDecoration(

                      color: isDark ? const Color(0xFF1E293B) : Color(0xFF64748B).withOpacity(0.05),

                      borderRadius: BorderRadius.circular(24),

                    ),

                    child: Row(

                      children: [

                        const Icon(Icons.sentiment_satisfied_alt, color: Colors.grey, size: 20),

                        const SizedBox(width: 8),

                        const Expanded(

                          child: TextField(

                             decoration: InputDecoration(

                              hintText: 'Type a message...',

                              hintStyle: TextStyle(fontSize: 14, color: Colors.grey),

                              border: InputBorder.none,

                              contentPadding: EdgeInsets.symmetric(vertical: 12),

                            ),

                          ),

                        ),

                        const Icon(Icons.camera_alt_outlined, color: Colors.grey, size: 20),

                      ],

                    ),

                  ),

                ),

                 const SizedBox(width: 8),

                Container(

                  width: 40,

                  height: 40,

                  decoration: BoxDecoration(

                    color: AppTheme.primary,

                    shape: BoxShape.circle,

                    boxShadow: [

                      BoxShadow(

                        color: AppTheme.primary.withOpacity(0.3),

                        blurRadius: 8,

                        offset: const Offset(0, 4),

                      ),

                    ],

                  ),

                  child: const Icon(Icons.mic_none, color: Colors.white),

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

}

class _ChatMessage extends StatelessWidget {

  final String message;

  final String time;

  final bool isMe;

  final bool isRead;

  final String? imageUrl;

  final String? attachmentUrl;

  const _ChatMessage({

    required this.message,

    required this.time,

    required this.isMe,

    this.isRead = false,

    this.imageUrl,

    this.attachmentUrl,

  });

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Padding(

      padding: const EdgeInsets.only(bottom: 24.0),

      child: Row(

        crossAxisAlignment: CrossAxisAlignment.end,

        mainAxisAlignment: isMe ? MainAxisAlignment.end : MainAxisAlignment.start,

        children: [

          if (!isMe && imageUrl != null) ...[

             CircleAvatar(

              radius: 16,

              backgroundImage: NetworkImage(imageUrl!),

            ),

            const SizedBox(width: 8),

          ],

          Flexible(

            child: Column(

              crossAxisAlignment: isMe ? CrossAxisAlignment.end : CrossAxisAlignment.start,

              children: [

                Container(

                   padding: const EdgeInsets.all(12),

                  decoration: BoxDecoration(

                    color: isMe ? AppTheme.primary : (isDark ? const Color(0xFF1E293B) : Colors.white),

                    borderRadius: BorderRadius.only(

                      topLeft: const Radius.circular(16),

                      topRight: const Radius.circular(16),

                      bottomLeft: isMe ? const Radius.circular(16) : Radius.zero,

                      bottomRight: isMe ? Radius.zero : const Radius.circular(16),

                    ),

                    boxShadow: [

                      BoxShadow(

                        color: Colors.black.withOpacity(0.02),

                        blurRadius: 4,

                        offset: const Offset(0, 2),

                      ),

                    ],

                  ),

                  child: Column(

                    children: [

                      if (attachmentUrl != null) ...[

                        ClipRRect(

                          borderRadius: BorderRadius.circular(12),

                          child: Image.network(

                            attachmentUrl!,

                            height: 180,

                            width: 200,

                            fit: BoxFit.cover,

                          ),

                        ),

                        const SizedBox(height: 8),

                      ],

                      Text(

                        message,

                        style: TextStyle(

                          fontSize: 14,

                          color: isMe ? Colors.white : (isDark ? Colors.white : Colors.black87),

                        ),

                      ),

                    ],

                  ),

                ),

                const SizedBox(height: 4),

                Row(

                  mainAxisSize: MainAxisSize.min,

                  children: [

                    Text(

                      time,

                      style: const TextStyle(fontSize: 10, color: Colors.grey),

                    ),

                    if (isMe && isRead) ...[

                      const SizedBox(width: 4),

                      const Icon(Icons.done_all, color: AppTheme.primary, size: 14),

                    ],

                  ],

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

}
