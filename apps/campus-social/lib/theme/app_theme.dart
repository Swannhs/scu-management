
import 'package:flutter/material.dart';

import 'package:google_fonts/google_fonts.dart';

class AppTheme {

  static const Color primary = Color(0xFF00A870);

  static const Color backgroundLight = Color(0xFFF8FAFC);

  static const Color backgroundDark = Color(0xFF0F172A);

  static const Color cardLight = Colors.white;

  static const Color cardDark = Color(0xFF1E293B);

  static const Color accent = Color(0xFF38BDF8);

  static const Color textLight = Color(0xFF0F172A);

  static const Color textDark = Color(0xFFF1F5F9);

  static ThemeData get lightTheme {

    return ThemeData(

      useMaterial3: true,

      colorScheme: ColorScheme.fromSeed(

        seedColor: primary,

        primary: primary,

        background: backgroundLight,

      ),

      textTheme: GoogleFonts.interTextTheme(),

      scaffoldBackgroundColor: backgroundLight,

      appBarTheme: const AppBarTheme(

        backgroundColor: Colors.white,

        elevation: 0,

        surfaceTintColor: Colors.transparent,

      ),

    );

  }

  static ThemeData get darkTheme {

    return ThemeData(

      useMaterial3: true,

      colorScheme: ColorScheme.fromSeed(

        seedColor: primary,

        primary: primary,

        background: backgroundDark,

        brightness: Brightness.dark,

      ),

      textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme),

      scaffoldBackgroundColor: backgroundDark,

      appBarTheme: const AppBarTheme(

        backgroundColor: backgroundDark,

        elevation: 0,

        surfaceTintColor: Colors.transparent,

      ),

    );

  }

}
