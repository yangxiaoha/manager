package com.haiyu.manager.pojo.dic;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * 锁卡原因字典表
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2020-08-27 16:52:23
 */
@Data
@Table(name="dic_block_reason")
public class BlockReasonDO implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    /**
     * 值
     */
    private Integer code;
    /**
     * 描述
     */
    private String description;
    /**
     * 逻辑删除标识 0:删除 1:未删除
     */
    private Integer logicDelete;
    /**
     * 创建时间
     */
    @Column(name = "create_time")
    private String createTime;
    /**
     * 地标
     */
    @Column(name = "land_mark")
    private String landMark;

}

