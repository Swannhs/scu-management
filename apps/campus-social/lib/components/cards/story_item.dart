
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class StoryItem extends StatelessWidget {

  final String name;

  final String imageUrl;

  final bool isCurrentUser;

  const StoryItem({

    super.key,

    required this.name,

    required this.imageUrl,

    this.isCurrentUser = false,

  });

  @override

  Widget build(BuildContext context) {

    return Padding(

      padding: const EdgeInsets.only(right: 16.0),

      child: Column(

        children: [

          Stack(

            children: [

              Container(

                width: 64,

                height: 64,

                padding: const EdgeInsets.all(2),

                decoration: BoxDecoration(

                  shape: BoxShape.circle,

                  border: Border.all(

                    color: AppTheme.primary,

                    width: 2,

                    style: isCurrentUser ? BorderStyle.solid : BorderStyle.solid,

                  ),

                ),

                child: CircleAvatar(

                  backgroundImage: NetworkImage(imageUrl),

                ),

              ),

              if (isCurrentUser)

                Positioned(

                  bottom: 0,

                  right: 0,

                  child: Container(

                    padding: const EdgeInsets.all(2),

                    decoration: BoxDecoration(

                      color: AppTheme.primary,

                      shape: BoxShape.circle,

                      border: Border.fromBorderSide(

                        BorderSide(color: Colors.white, width: 2),

                      ),

                    ),

                    child: const Icon(

                      Icons.add,

                      color: Colors.white,

                      size: 14,

                    ),

                  ),

                ),

            ],

          ),

          const SizedBox(height: 8),

          Text(

            name,

            style: const TextStyle(

              fontSize: 11,

              fontWeight: FontWeight.w500,

            ),

          ),

        ],

      ),

    );

  }

}
