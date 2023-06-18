package com.ajisegiri.chatapp.service;


import lombok.RequiredArgsConstructor;

import com.ajisegiri.chatapp.model.DbSequence;

import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.util.Objects;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;

@Component
@RequiredArgsConstructor
public class SequenceGeneratorService {
    private final MongoOperations mongoOperations;

    public Long getSequenceNumber(String sequenceName){
        Query query=new Query(Criteria.where("id").is(sequenceName));

        Update update=new Update().inc("seq",1);

        DbSequence counter= mongoOperations
                .findAndModify(query,update,options().returnNew(true).upsert(true),DbSequence.class);

        return !Objects.isNull(counter) ?counter.getSeq() :1;
    }
}
