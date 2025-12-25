package com.university.finance.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE = "university_events";
    public static final String QUEUE = "finance_enrollment_queue";
    public static final String ROUTING_KEY = "student.enrolled";

    @Bean
    public TopicExchange universityExchange() {
        return new TopicExchange(EXCHANGE);
    }

    @Bean
    public Queue financeQueue() {
        return new Queue(QUEUE, true);
    }

    @Bean
    public Binding binding(Queue financeQueue, TopicExchange universityExchange) {
        return BindingBuilder.bind(financeQueue).to(universityExchange).with(ROUTING_KEY);
    }
}
