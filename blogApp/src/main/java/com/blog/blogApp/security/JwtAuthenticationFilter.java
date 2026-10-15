package com.blog.blogApp.security;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil util;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        final String header = request.getHeader("Authorization");

        String token = null;
        String userName = null;

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);

            try {
                userName = util.getUserNameFromToken(token);
            } catch (Exception e) {
                // Invalid or expired token.
                // Continue the filter chain without authentication.
            }
        }

        if (userName != null
                && SecurityContextHolder.getContext().getAuthentication() == null
                && util.validateToken(token)) {

            UserDetails details =
                    userDetailsService.loadUserByUsername(userName);

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(
                            details,
                            null,
                            details.getAuthorities()
                    );

            authenticationToken.setDetails(
                    new WebAuthenticationDetailsSource()
                            .buildDetails(request)
            );

            SecurityContextHolder.getContext()
                    .setAuthentication(authenticationToken);
        }

        filterChain.doFilter(request, response);
    }
}
