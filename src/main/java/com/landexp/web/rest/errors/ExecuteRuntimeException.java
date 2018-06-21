package com.landexp.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class ExecuteRuntimeException extends AbstractThrowableProblem {
    public ExecuteRuntimeException(String message) {
        super(ErrorConstants.DEFAULT_TYPE, message, Status.BAD_REQUEST);
    }
}
